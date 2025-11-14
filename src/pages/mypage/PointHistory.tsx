import { useMemo, useState, useCallback } from "react";
import { PointHistoryView } from "./PointHistoryView";
import {
  useGetChargeHistory,
  useGetUsageHistory,
  useGetChargeOptions,
  useIamportPayment,
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
  const { requestPayment, isCharging } = useIamportPayment();

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
    ) {
      toast.error("충전 옵션, 결제 수단을 선택하고 약관에 동의해주세요.");
      return;
    }

    const selectedOption = chargeOptionsData.chargeOptions.find(
      (opt) => opt.chargePoint === selectedChargeOption,
    );
    if (!selectedOption) {
      toast.error("선택한 충전 옵션을 찾을 수 없습니다.");
      return;
    }

    // 아임포트 결제 요청
    requestPayment(
      {
        chargePoint: selectedOption.chargePoint,
        price: selectedOption.price,
        paymentMethod: selectedPaymentMethod,
      },
      {
        onSuccess: () => {
          toast.success("포인트 충전이 완료되었습니다.");
          setSelectedChargeOption(null);
          setSelectedPaymentMethod(null);
          setAgreedToTerms(false);
        },
        onError: (errorMessage) => {
          toast.error(errorMessage);
        },
      },
    );
  }, [
    selectedChargeOption,
    selectedPaymentMethod,
    agreedToTerms,
    chargeOptionsData,
    requestPayment,
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
