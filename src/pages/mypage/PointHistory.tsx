import { useMemo } from "react";
import { PointHistoryView } from "./PointHistoryView";
import { useGetChargeHistory, useGetUsageHistory } from "@/querys/usePayment";
import { useTab } from "@/hooks/useTab";

type PointTab = "포인트 충전" | "충전 내역" | "사용 내역";

const PointHistory = () => {
  const { activeTab, onTabChange } = useTab<PointTab>("충전 내역");
  
  // React Query hooks 직접 사용
  const { data: chargeHistoryData } = useGetChargeHistory();
  const { data: usageHistoryData } = useGetUsageHistory();

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

  return (
    <PointHistoryView
      activeTab={activeTab}
      chargeHistory={chargeHistory}
      usageHistory={usageHistory}
      onTabChange={onTabChange}
    />
  );
};

export default PointHistory;
