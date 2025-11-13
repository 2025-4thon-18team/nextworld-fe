import { FC } from "react";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { ChargePointItem } from "@/components/ChargePointItem/ChargePointItem";
import { PaymentItem } from "@/components/PaymentItem/PaymentItem";

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
  onTabChange: (tab: PointTab) => void;
};

export const PointHistoryView: FC<Props> = ({
  activeTab,
  chargeHistory,
  usageHistory,
  onTabChange,
}) => {
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
        <div className="gap-xs flex flex-col items-start">
          {/* 포인트 충전 폼이 들어갈 자리 */}
          <p className="text-body-medium text-black">포인트 충전 폼</p>
        </div>
      )}
    </div>
  );
};
