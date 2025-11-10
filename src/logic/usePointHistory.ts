import { useState, useEffect, useCallback } from "react";
import type { PointPort, UserPort } from "@/services/types";

type PointTab = "포인트 충전" | "충전 내역" | "사용 내역";

export function usePointHistory(params: {
  user?: UserPort;
  point?: PointPort;
}) {
  const { user, point } = params;
  const [activeTab, setActiveTab] = useState<PointTab>("충전 내역");
  const [points, setPoints] = useState<number>(0);
  const [chargeHistory, setChargeHistory] = useState<
    Array<{
      id: number;
      title: string;
      date: string;
      points: number;
    }>
  >([]);
  const [usageHistory, setUsageHistory] = useState<
    Array<{
      id: number;
      type: "post";
      title: string;
      subtitle: string;
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
    if (!point) return;
    let alive = true;
    point
      .getChargeHistory()
      .then((history) => alive && setChargeHistory(history));
    point
      .getUsageHistory()
      .then((history) => alive && setUsageHistory(history));
    return () => {
      alive = false;
    };
  }, [point]);

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
