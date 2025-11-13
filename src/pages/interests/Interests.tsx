import { FC, useCallback } from "react";
import { InterestsView } from "./InterestsView";
import { useGetAllWorks } from "@/querys/useWorks";
import { useGetAllPosts } from "@/querys/usePosts";
import { useTab } from "@/hooks/useTab";
import { useNavigation } from "@/hooks/useNavigation";
import { useWorkTransform } from "@/hooks/useWorkTransform";
import {
  usePostTransform,
  useContentItemTransform,
} from "@/hooks/usePostTransform";

type HomeCategoryTab = "홈" | "신규" | "관심";

export const Interests: FC = () => {
  const { activeTab, onTabChange: setActiveTab } =
    useTab<HomeCategoryTab>("관심");
  const {
    navigateToNew,
    navigateToHome,
    navigateToSeries,
    navigateToPost,
    navigateToContent,
  } = useNavigation();

  // React Query hooks 직접 사용
  // TODO: 백엔드에 관심 작품, 최신 업데이트, 신규 유니버스 API가 없어서 임시로 모든 작품/포스트 조회
  const { data: originalWorks } = useGetAllWorks("ORIGINAL");
  const { data: derivativeWorks } = useGetAllWorks("DERIVATIVE");
  const { data: postsData } = useGetAllPosts();

  const favoriteSeries = useWorkTransform(originalWorks?.slice(0, 5));
  const latestUpdates = useContentItemTransform(postsData, 4);
  const newPosts = usePostTransform(postsData, 9);
  const newUniverseSeries = useWorkTransform(derivativeWorks?.slice(0, 6));

  const handleTabChange = useCallback(
    (tab: HomeCategoryTab) => {
      setActiveTab(tab);
      if (tab === "신규") {
        navigateToNew();
      } else if (tab === "홈") {
        navigateToHome();
      }
    },
    [setActiveTab, navigateToNew, navigateToHome],
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

  const handleContentClick = useCallback(
    (id: string) => {
      navigateToContent(id);
    },
    [navigateToContent],
  );

  return (
    <InterestsView
      activeTab={activeTab}
      onTabChange={handleTabChange}
      favoriteSeries={favoriteSeries}
      latestUpdates={latestUpdates}
      newPosts={newPosts}
      newUniverseSeries={newUniverseSeries}
      onSeriesClick={handleSeriesClick}
      onPostClick={handlePostClick}
      onContentClick={handleContentClick}
    />
  );
};

export default Interests;

