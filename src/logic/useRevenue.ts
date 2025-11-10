import { useState, useEffect, useCallback } from "react";
import type { RevenuePort, UserPort } from "@/services/types";

type RevenueTab = "대시보드" | "판매내역";

export function useRevenue(params: { user?: UserPort; revenue?: RevenuePort }) {
  const { user, revenue } = params;
  const [activeTab, setActiveTab] = useState<RevenueTab>("대시보드");
  const [points, setPoints] = useState<number>(0);
  const [revenueData, setRevenueData] = useState<{
    totalSales: number;
    totalRevenue: number;
    authorFee: number;
    platformFee: number;
  } | null>(null);
  const [salesHistory, setSalesHistory] = useState<
    Array<{
      id: number;
      contentTitle: string;
      buyer: string;
      points: number;
      date: string;
    }>
  >([]);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    user.getPoints().then((p) => alive && setPoints(p));
    return () => {
      alive = false;
    };
  }, [user]);

  useEffect(() => {
    if (!revenue) return;
    let alive = true;
    revenue.getRevenueData().then((data) => alive && setRevenueData(data));
    revenue
      .getSalesHistory()
      .then((history) => alive && setSalesHistory(history));
    return () => {
      alive = false;
    };
  }, [revenue]);

  const onTabChange = useCallback((tab: RevenueTab) => {
    setActiveTab(tab);
  }, []);

  const formattedRevenueData = revenueData
    ? {
        totalSales: `${revenueData.totalSales} 개`,
        totalRevenue: `₩ ${revenueData.totalRevenue.toLocaleString()}`,
        authorFee: `₩ ${revenueData.authorFee.toLocaleString()}`,
        platformFee: `₩ ${revenueData.platformFee.toLocaleString()}`,
        finalRevenue: `₩ ${(revenueData.totalRevenue - revenueData.authorFee - revenueData.platformFee).toLocaleString()}`,
      }
    : null;

  return {
    activeTab,
    points,
    revenueData: formattedRevenueData,
    salesHistory,
    onTabChange,
  };
}
