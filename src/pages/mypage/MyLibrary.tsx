import { MyLibraryView } from "./MyLibraryView";
import { useGetPurchasedWorks } from "@/querys/usePayment";
import { useTab } from "@/hooks/useTab";
import { useSimpleWorkTransform } from "@/hooks/useWorkTransform";

type TabType = "구매한 작품" | "구매한 포스트";

const MyLibrary = () => {
  const { activeTab, onTabChange } = useTab<TabType>("구매한 작품");

  // React Query hooks 직접 사용
  const { data: purchasedWorks } = useGetPurchasedWorks();

  const seriesList = useSimpleWorkTransform(purchasedWorks);

  return (
    <MyLibraryView
      seriesList={seriesList}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
};

export default MyLibrary;
