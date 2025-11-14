import { useMemo, useState, useCallback } from "react";
import { PointHistoryView } from "./PointHistoryView";
import {
  useGetChargeHistory,
  useGetUsageHistory,
  useGetChargeOptions,
  useChargePoints,
  useVerifyPayment,
} from "@/querys/usePayment";
import { useTab } from "@/hooks/useTab";
import { toast } from "sonner";

type PointTab = "포인트 충전" | "충전 내역" | "사용 내역";

const PointHistory = () => {
  const { activeTab, onTabChange } = useTab<PointTab>("포인트 충전");
  const [selectedChargeOption, setSelectedChargeOption] = useState<
    number | null
  >(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // React Query hooks 직접 사용
  const { data: chargeHistoryData } = useGetChargeHistory();
  const { data: usageHistoryData } = useGetUsageHistory();
  const { data: chargeOptionsData } = useGetChargeOptions();
  const { mutate: chargePoints, isPending: isCharging } = useChargePoints();
  const { mutate: verifyPayment } = useVerifyPayment();

  const chargeHistory = useMemo(() => {
    if (!chargeHistoryData) return [];
    return chargeHistoryData.map((item, index) => ({
      id: index + 1,
      title: item.title,
      date: item.date,
      points: item.amount,
    }));
  }, [chargeHistoryData]);

  const usageHistory = useMemo(() => {
    if (!usageHistoryData) return [];
    return usageHistoryData.map((item, index) => ({
      id: index + 1,
      type: "post" as const,
      title: item.title,
      subtitle: item.opponentName || "",
      points: Math.abs(item.amount),
      date: item.date,
    }));
  }, [usageHistoryData]);

  const handleChargeOptionSelect = useCallback((chargePoint: number) => {
    setSelectedChargeOption(chargePoint);
  }, []);

  const handlePaymentMethodSelect = useCallback((method: string) => {
    setSelectedPaymentMethod(method);
  }, []);

  const handleChargeSubmit = useCallback(() => {
    if (
      !selectedChargeOption ||
      !selectedPaymentMethod ||
      !agreedToTerms ||
      !chargeOptionsData
    )
      return;

    const selectedOption = chargeOptionsData.chargeOptions.find(
      (opt) => opt.chargePoint === selectedChargeOption,
    );
    if (!selectedOption) return;

    // TODO: 아임포트 결제 위젯 연동
    // 현재는 임시로 직접 charge API 호출
    // 실제로는 아임포트 결제 후 impUid를 받아서 charge -> verify 순서로 호출해야 함
    const merchantUid = `charge_${Date.now()}`;

    // TODO: 아임포트 결제 위젯 연동
    // 실제로는 아임포트 결제 후 impUid를 받아서 charge -> verify 순서로 호출해야 함
    // 현재는 개발 환경을 위해 임시로 직접 charge API 호출 (실제 impUid 필요)

    // 아임포트 결제 위젯 호출
    interface IMPWindow {
      IMP?: {
        init: (code: string) => void;
        request_pay: (
          params: {
            pg: string;
            pay_method: string;
            merchant_uid: string;
            name: string;
            amount: number;
            buyer_email: string;
            buyer_name: string;
          },
          callback: (rsp: {
            success: boolean;
            imp_uid: string;
            error_msg?: string;
          }) => void,
        ) => void;
      };
    }

    const impWindow = window as unknown as IMPWindow;

    if (typeof window !== "undefined" && impWindow.IMP) {
      const IMP = impWindow.IMP;
      IMP.init("imp1234567890"); // 실제 아임포트 가맹점 식별코드로 교체 필요

      // 결제 수단에 따라 pg 설정
      const pgMap: Record<string, string> = {
        네이버페이: "naverpay",
        카카오페이: "kakaopay",
        "카드 결제": "html5_inicis",
        "계좌 이체": "html5_inicis",
      };

      IMP.request_pay(
        {
          pg: pgMap[selectedPaymentMethod] || "html5_inicis",
          pay_method: "card",
          merchant_uid: merchantUid,
          name: `${selectedOption.chargePoint}P 충전`,
          amount: selectedOption.price,
          buyer_email: "",
          buyer_name: "",
        },
        (rsp) => {
          if (rsp.success) {
            // 결제 성공 시 charge API 호출
            chargePoints(
              {
                impUid: rsp.imp_uid,
                amount: selectedOption.price,
              },
              {
                onSuccess: () => {
                  // charge 성공 후 verify API 호출
                  verifyPayment(
                    { impUid: rsp.imp_uid },
                    {
                      onSuccess: () => {
                        toast.success("포인트 충전이 완료되었습니다.");
                        setSelectedChargeOption(null);
                        setSelectedPaymentMethod(null);
                        setAgreedToTerms(false);
                      },
                      onError: (error: unknown) => {
                        const errorMessage =
                          (
                            error as {
                              response?: { data?: { message?: string } };
                            }
                          )?.response?.data?.message ||
                          "결제 검증에 실패했습니다.";
                        toast.error(errorMessage);
                      },
                    },
                  );
                },
                onError: (error: unknown) => {
                  const errorMessage =
                    (error as { response?: { data?: { message?: string } } })
                      ?.response?.data?.message ||
                    "포인트 충전에 실패했습니다.";
                  toast.error(errorMessage);
                },
              },
            );
          } else {
            toast.error(rsp.error_msg || "결제에 실패했습니다.");
          }
        },
      );
    } else {
      // 아임포트가 없는 경우 개발 환경에서 임시 처리
      toast.error("결제 시스템을 초기화할 수 없습니다.");
    }
  }, [
    selectedChargeOption,
    selectedPaymentMethod,
    agreedToTerms,
    chargeOptionsData,
    chargePoints,
    verifyPayment,
  ]);

  return (
    <PointHistoryView
      activeTab={activeTab}
      chargeHistory={chargeHistory}
      usageHistory={usageHistory}
      chargeOptions={chargeOptionsData?.chargeOptions || []}
      currentPoints={chargeOptionsData?.currentPoints || 0}
      selectedChargeOption={selectedChargeOption}
      paymentMethods={chargeOptionsData?.paymentMethods || []}
      selectedPaymentMethod={selectedPaymentMethod}
      onTabChange={onTabChange}
      onChargeOptionSelect={handleChargeOptionSelect}
      onPaymentMethodSelect={handlePaymentMethodSelect}
      onChargeSubmit={handleChargeSubmit}
      isCharging={isCharging}
      agreedToTerms={agreedToTerms}
      onAgreeToTermsChange={setAgreedToTerms}
    />
  );
};

export default PointHistory;
