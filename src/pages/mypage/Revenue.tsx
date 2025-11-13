import { useMemo } from "react";
import { RevenueView } from "./RevenueView";
import { useGetMyPoints } from "@/querys/useMypage";
import { useGetRevenueDashboard, useGetSales } from "@/querys/useRevenue";
import { useTab } from "@/hooks/useTab";
import { usePoints } from "@/hooks/usePoints";

type RevenueTab = "대시보드" | "판매내역";

const Revenue = () => {
  const { activeTab, onTabChange } = useTab<RevenueTab>("대시보드");
  
  // React Query hooks 직접 사용
  const { data: pointsData } = useGetMyPoints();
  const { data: dashboardData } = useGetRevenueDashboard();
  const { data: salesData } = useGetSales();

  const { points } = usePoints(pointsData?.balance);

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

  return (
    <RevenueView
      points={points}
      activeTab={activeTab}
      revenueData={formattedRevenueData}
      salesHistory={salesHistory}
      onTabChange={onTabChange}
    />
  );
};

export default Revenue;
