import { useMemo } from "react";
import { RevenueView } from "./RevenueView";
import { useGetRevenueDashboard, useGetSales } from "@/querys/useRevenue";
import { useTab } from "@/hooks/useTab";
import { RevenueDashboardResponse } from "@/querys/types";

type RevenueTab = "대시보드" | "판매내역";

const Revenue = () => {
  const { activeTab, onTabChange } = useTab<RevenueTab>("대시보드");

  // React Query hooks 직접 사용
  const { data: dashboardData } = useGetRevenueDashboard();
  const { data: salesData } = useGetSales();

  const formattedRevenueData = useMemo(() => {
    if (!dashboardData) return null;

    const dashboardDataKey = Object.keys(
      dashboardData,
    ) as (keyof RevenueDashboardResponse)[];

    for (const key of dashboardDataKey) {
      if (!dashboardData[key]) {
        dashboardData[key] = 0;
      }
      dashboardData[key] = Number(dashboardData[key]) || 0;
    }
    return {
      totalSales: `${dashboardData.totalSalesCount} 개`,
      totalRevenue: `₩ ${dashboardData.totalRevenue}`,
      authorFee: `₩ ${dashboardData.originalAuthorFee}`,
      platformFee: `₩ ${dashboardData.platformFee}`,
      finalRevenue: `₩ ${dashboardData.netIncome}`,
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

  return (
    <RevenueView
      activeTab={activeTab}
      revenueData={formattedRevenueData}
      salesHistory={salesHistory}
      onTabChange={onTabChange}
    />
  );
};

export default Revenue;
