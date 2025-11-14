import { FC, useMemo, useCallback } from "react";
import { HomeView } from "./HomeView";
import { useGetAllWorks } from "@/querys/useWorks";
import { useGetAllPosts } from "@/querys/usePosts";
import { useTab } from "@/hooks/useTab";
import { useNavigation } from "@/hooks/useNavigation";
import { useWorkTransform } from "@/hooks/useWorkTransform";
import { usePostTransform } from "@/hooks/usePostTransform";

type HomeCategoryTab = "홈" | "신규" | "관심";

export const Home: FC = () => {
  const { activeTab, onTabChange: setActiveTab } =
    useTab<HomeCategoryTab>("홈");
  const { navigateToNew, navigateToInterests, navigateToHome } =
    useNavigation();

  // React Query hooks 직접 사용
  const { data: worksData } = useGetAllWorks();
  const { data: postsData } = useGetAllPosts();

  const popularSeries = useWorkTransform(worksData?.slice(0, 4));
  const popularPosts = usePostTransform(postsData, 8);

  const universeOfWeek = useMemo(() => {
    if (!worksData || worksData.length === 0) return null;
    const work = worksData[0];
    return {
      id: String(work.id),
      imageUrl: work.coverImageUrl,
      title: work.title,
      tags: work.tags,
    };
  }, [worksData]);

  const handleTabChange = useCallback(
    (tab: HomeCategoryTab) => {
      setActiveTab(tab);
      if (tab === "신규") {
        navigateToNew();
      } else if (tab === "관심") {
        navigateToInterests();
      } else {
        navigateToHome();
      }
    },
    [setActiveTab, navigateToNew, navigateToInterests, navigateToHome],
  );

  return (
    <HomeView
      activeTab={activeTab}
      onTabChange={handleTabChange}
      universeOfWeek={universeOfWeek}
      popularSeries={popularSeries}
      popularPosts={popularPosts}
    />
  );
};

export default Home;
