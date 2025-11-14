import { FC } from "react";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { ChargePointItem } from "@/components/ChargePointItem/ChargePointItem";
import { PaymentItem } from "@/components/PaymentItem/PaymentItem";
import { ChargePointOption } from "@/components/ChargePointOption/ChargePointOption";
import { PaymentMethodOption } from "@/components/PaymentMethodOption/PaymentMethodOption";
import Button from "@/components/Button/Button";
import { cn } from "@/utils";
import { usePoints } from "@/hooks/usePoints";

type PointTab = "포인트 충전" | "충전 내역" | "사용 내역";

type Props = {
  activeTab: PointTab;
  chargeHistory: Array<{
    id: number;
    title: string;
    date: string;
    points: number;
  }>;
  usageHistory: Array<{
    id: number;
    type: "post";
    title: string;
    subtitle: string;
    points: number;
    date: string;
  }>;
  chargeOptions?: Array<{
    chargePoint: number;
    price: number;
    expectedBalance: number;
  }>;
  currentPoints?: number;
  selectedChargeOption?: number | null;
  paymentMethods?: string[];
  selectedPaymentMethod?: string | null;
  onTabChange: (tab: PointTab) => void;
  onChargeOptionSelect?: (chargePoint: number) => void;
  onPaymentMethodSelect?: (method: string) => void;
  onChargeSubmit?: () => void;
  isCharging?: boolean;
  agreedToTerms?: boolean;
  onAgreeToTermsChange?: (agreed: boolean) => void;
};

export const PointHistoryView: FC<Props> = ({
  activeTab,
  chargeHistory,
  usageHistory,
  chargeOptions = [],
  currentPoints = 0,
  selectedChargeOption,
  paymentMethods = [],
  selectedPaymentMethod,
  onTabChange,
  onChargeOptionSelect,
  onPaymentMethodSelect,
  onChargeSubmit,
  isCharging = false,
  agreedToTerms = false,
  onAgreeToTermsChange,
}) => {
  const { formattedPoints } = usePoints(currentPoints);

  const selectedOption = chargeOptions.find(
    (opt) => opt.chargePoint === selectedChargeOption,
  );
  return (
    <div className="flex flex-col gap-24">
      {/* Tab Buttons */}
      <div className="flex items-center gap-2">
        <RadioButton
          selected={activeTab === "포인트 충전"}
          onClick={() => onTabChange("포인트 충전")}
        >
          포인트 충전
        </RadioButton>
        <RadioButton
          selected={activeTab === "충전 내역"}
          onClick={() => onTabChange("충전 내역")}
        >
          충전 내역
        </RadioButton>
        <RadioButton
          selected={activeTab === "사용 내역"}
          onClick={() => onTabChange("사용 내역")}
        >
          사용 내역
        </RadioButton>
      </div>

      {/* Content based on active tab */}
      {activeTab === "충전 내역" && (
        <div className="gap-xs flex flex-col items-start">
          {chargeHistory.map((item) => (
            <ChargePointItem
              key={item.id}
              title={item.title}
              date={item.date}
              points={item.points}
            />
          ))}
        </div>
      )}

      {activeTab === "사용 내역" && (
        <div className="gap-xs flex flex-col items-start">
          {usageHistory.map((item) => (
            <PaymentItem
              key={item.id}
              type={item.type}
              title={item.title}
              subtitle={item.subtitle}
              points={item.points}
              date={item.date}
            />
          ))}
        </div>
      )}

      {activeTab === "포인트 충전" && (
        <div className="gap-lg flex w-full flex-col">
          {/* 포인트 옵션 선택 */}
          <div className="gap-xs flex flex-col">
            <p className="text-body-medium text-black">충전 포인트</p>
            <div className="gap-xs grid grid-cols-2">
              {chargeOptions.map((option) => (
                <ChargePointOption
                  key={option.chargePoint}
                  points={option.chargePoint}
                  price={option.price}
                  isSelected={selectedChargeOption === option.chargePoint}
                  onClick={() => onChargeOptionSelect?.(option.chargePoint)}
                />
              ))}
            </div>
          </div>

          {/* 결제 수단 선택 */}
          <div className="gap-xs flex flex-col">
            <p className="text-body-medium text-black">결제 수단</p>
            <div className="gap-xs grid grid-cols-2">
              {paymentMethods.map((method) => (
                <PaymentMethodOption
                  key={method}
                  method={method}
                  isSelected={selectedPaymentMethod === method}
                  onClick={() => onPaymentMethodSelect?.(method)}
                />
              ))}
            </div>
          </div>

          {/* 충전 후 보유 포인트 및 결제 금액 */}
          {selectedOption && (
            <div className="gap-md flex flex-col">
              <div className="gap-xs flex items-center justify-between">
                <p className="text-body-medium text-black">
                  충전 후 보유 포인트
                </p>
                <p className="text-body-medium text-text-on-accent-second">
                  {selectedOption.expectedBalance.toLocaleString()}P
                </p>
              </div>
              <div className="gap-xs flex items-center justify-between">
                <p className="text-body-medium text-black">결제 금액</p>
                <p className="text-body-medium text-right text-black">
                  {selectedOption.price.toLocaleString()}원
                </p>
              </div>
            </div>
          )}

          {/* 동의 체크박스 */}
          <div className="gap-xs flex items-center">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => onAgreeToTermsChange?.(e.target.checked)}
              className="size-20 shrink-0 rounded border border-black"
            />
            <p className="text-body-medium text-black">
              주문 내용과 아래 유의 사항을 확인하였으며 결제 진행에 동의합니다.
              <button
                type="button"
                className="text-primary-main underline"
                onClick={() => {
                  // TODO: 더보기 모달 구현
                }}
              >
                [더보기]
              </button>
            </p>
          </div>

          {/* 결제 버튼 */}
          <Button
            onClick={onChargeSubmit}
            disabled={
              !selectedChargeOption ||
              !selectedPaymentMethod ||
              !agreedToTerms ||
              isCharging
            }
            className={cn(
              "w-full",
              selectedChargeOption &&
                selectedPaymentMethod &&
                agreedToTerms &&
                !isCharging
                ? ""
                : "cursor-not-allowed opacity-50",
            )}
          >
            {isCharging ? "결제 중..." : "결제하기"}
          </Button>
        </div>
      )}
    </div>
  );
};
