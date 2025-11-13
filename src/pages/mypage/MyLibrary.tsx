import { MyLibraryView } from "./MyLibraryView";
import { useGetMyPoints } from "@/querys/useMypage";
import { useGetPurchasedWorks } from "@/querys/useMypage";
import { useTab } from "@/hooks/useTab";
import { usePoints } from "@/hooks/usePoints";
import { useSimpleWorkTransform } from "@/hooks/useWorkTransform";

type TabType = "구매한 작품" | "구매한 포스트";

const MyLibrary = () => {
  const { activeTab, onTabChange } = useTab<TabType>("구매한 작품");
  
  // React Query hooks 직접 사용
  const { data: pointsData } = useGetMyPoints();
  const { data: purchasedWorks } = useGetPurchasedWorks();

  const { points } = usePoints(pointsData?.balance);
  const seriesList = useSimpleWorkTransform(purchasedWorks);

  return (
    <MyLibraryView
      points={points}
      seriesList={seriesList}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
};

export default MyLibrary;
