import { FC, useCallback } from "react";
import { NewView } from "./NewView";
import { useGetAllWorks } from "@/querys/useWorks";
import { useGetAllPosts } from "@/querys/usePosts";
import { useTab } from "@/hooks/useTab";
import { useNavigation } from "@/hooks/useNavigation";
import { useWorkTransform } from "@/hooks/useWorkTransform";
import { usePostTransform } from "@/hooks/usePostTransform";

type HomeCategoryTab = "홈" | "신규" | "관심";

export const New: FC = () => {
  const { activeTab, onTabChange: setActiveTab } = useTab<HomeCategoryTab>("신규");
  const { navigateToHome, navigateToInterests, navigateToSeries, navigateToPost } =
    useNavigation();
  
  // React Query hooks 직접 사용
  // TODO: 백엔드에 신규 작품/포스트 API가 없어서 임시로 모든 작품/포스트 조회
  const { data: worksData } = useGetAllWorks("ORIGINAL");
  const { data: postsData } = useGetAllPosts();

  const newSeries = useWorkTransform(worksData?.slice(0, 12));
  const newPosts = usePostTransform(postsData, 9);

  const handleTabChange = useCallback(
    (tab: HomeCategoryTab) => {
      setActiveTab(tab);
      if (tab === "홈") {
        navigateToHome();
      } else if (tab === "관심") {
        navigateToInterests();
      }
    },
    [setActiveTab, navigateToHome, navigateToInterests],
  );

  const handleSeriesClick = useCallback(
    (id: string) => {
      navigateToSeries(id);
    },
    [navigateToSeries],
  );

  const handlePostClick = useCallback(
    (id: string) => {
      navigateToPost(id);
    },
    [navigateToPost],
  );

  return (
    <NewView
      activeTab={activeTab}
      onTabChange={handleTabChange}
      newSeries={newSeries}
      newPosts={newPosts}
      onSeriesClick={handleSeriesClick}
      onPostClick={handlePostClick}
    />
  );
};

export default New;

