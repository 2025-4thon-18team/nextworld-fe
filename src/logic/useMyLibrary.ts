import { useState, useEffect, useCallback } from "react";
import type { SeriesPort, UserPort } from "@/services/types";

type TabType = "구매한 작품" | "구매한 포스트";

export function useMyLibrary(params: { user?: UserPort; series?: SeriesPort }) {
  const { user, series } = params;
  const [activeTab, setActiveTab] = useState<TabType>("구매한 작품");
  const [seriesList, setSeriesList] = useState<
    Array<{ id: number; imageUrl: string; title: string }>
  >([]);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    user.getPoints().then((p) => alive && setPoints(p));
    return () => {
      alive = false;
    };
  }, [user]);

  useEffect(() => {
    if (!series) return;
    let alive = true;
    series.getLibrarySeries().then((list) => alive && setSeriesList(list));
    return () => {
      alive = false;
    };
  }, [series]);

  const onTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    seriesList,
    points,
    onTabChange,
  };
}
