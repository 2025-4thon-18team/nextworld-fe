import { useState, useMemo, useCallback } from "react";
import { useGetMyPoints } from "@/querys/useMypage";
import { useGetPurchasedWorks } from "@/querys/useMypage";

type TabType = "구매한 작품" | "구매한 포스트";

export function useMyLibrary() {
  const [activeTab, setActiveTab] = useState<TabType>("구매한 작품");
  
  // React Query hooks 직접 사용
  const { data: pointsData } = useGetMyPoints();
  const { data: purchasedWorks } = useGetPurchasedWorks();

  const points = useMemo(() => pointsData?.balance || 0, [pointsData]);
  
  const seriesList = useMemo(() => {
    if (!purchasedWorks) return [];
    return purchasedWorks.map((work) => ({
      id: work.id,
      imageUrl: work.coverImageUrl,
      title: work.title,
    }));
  }, [purchasedWorks]);

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
