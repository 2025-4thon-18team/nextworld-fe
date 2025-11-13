import { useState, useMemo, useCallback } from "react";
import { useGetMyPoints } from "@/querys/useMypage";
import { useGetChargeHistory, useGetUsageHistory } from "@/querys/usePayment";

type PointTab = "포인트 충전" | "충전 내역" | "사용 내역";

export function usePointHistory() {
  const [activeTab, setActiveTab] = useState<PointTab>("충전 내역");
  
  // React Query hooks 직접 사용
  const { data: pointsData } = useGetMyPoints();
  const { data: chargeHistoryData } = useGetChargeHistory();
  const { data: usageHistoryData } = useGetUsageHistory();

  const points = useMemo(() => pointsData?.balance || 0, [pointsData]);

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

  const onTabChange = useCallback((tab: PointTab) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    points,
    chargeHistory,
    usageHistory,
    onTabChange,
  };
}
