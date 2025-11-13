import { useState, useMemo, useCallback } from "react";
import { useGetMyPoints } from "@/querys/useMypage";
import { useGetRevenueDashboard, useGetSales } from "@/querys/useRevenue";

type RevenueTab = "대시보드" | "판매내역";

export function useRevenue() {
  const [activeTab, setActiveTab] = useState<RevenueTab>("대시보드");
  
  // React Query hooks 직접 사용
  const { data: pointsData } = useGetMyPoints();
  const { data: dashboardData } = useGetRevenueDashboard();
  const { data: salesData } = useGetSales();

  const points = useMemo(() => pointsData?.balance || 0, [pointsData]);

  const formattedRevenueData = useMemo(() => {
    if (!dashboardData) return null;
    return {
      totalSales: `${dashboardData.totalSalesCount} 개`,
      totalRevenue: `₩ ${dashboardData.totalRevenue.toLocaleString()}`,
      authorFee: `₩ ${dashboardData.originalAuthorFee.toLocaleString()}`,
      platformFee: `₩ ${dashboardData.platformFee.toLocaleString()}`,
      finalRevenue: `₩ ${dashboardData.netIncome.toLocaleString()}`,
    };
  }, [dashboardData]);

  const salesHistory = useMemo(() => {
    if (!salesData) return [];
    return salesData.map((item, index) => ({
      id: index + 1,
      contentTitle: item.postTitle,
      buyer: item.buyerNickname,
      points: item.amount,
      date: item.date,
    }));
  }, [salesData]);

  const onTabChange = useCallback((tab: RevenueTab) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    points,
    revenueData: formattedRevenueData,
    salesHistory,
    onTabChange,
  };
}
