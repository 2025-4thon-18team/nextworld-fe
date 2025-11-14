import { FC, useCallback } from "react";
import { NewView } from "./NewView";
import { useGetRecentFeed } from "@/querys/useFeed";
import { useTab } from "@/hooks/useTab";
import { useNavigation } from "@/hooks/useNavigation";
import { useWorkTransform } from "@/hooks/useWorkTransform";
import { usePostTransform } from "@/hooks/usePostTransform";

type CategoryTabsTab = "홈" | "신규" | "관심";

export const New: FC = () => {
  const { activeTab, onTabChange: setActiveTab } =
    useTab<CategoryTabsTab>("신규");
  const { navigateToHome, navigateToInterests } = useNavigation();
  // React Query hooks 직접 사용
  const { data: recentFeedData } = useGetRecentFeed();

  const newSeries = useWorkTransform(recentFeedData?.works?.slice(0, 12));
  const newPosts = usePostTransform(recentFeedData?.posts, 9);

  const handleTabChange = useCallback(
    (tab: CategoryTabsTab) => {
      setActiveTab(tab);
      if (tab === "홈") {
        navigateToHome();
      } else if (tab === "관심") {
        navigateToInterests();
      }
    },
    [setActiveTab, navigateToHome, navigateToInterests],
  );

  return (
    <NewView
      activeTab={activeTab}
      onTabChange={handleTabChange}
      newSeries={newSeries}
      newPosts={newPosts}
    />
  );
};

export default New;
