import { FC, useCallback, useState, useMemo, useEffect } from "react";
import { InterestsView } from "./InterestsView";
import {
  useGetDerivativePosts,
  useGetAllWorks,
  useGetWorkEpisodes,
} from "@/querys/useWorks";
import { useGetEpisodesByWork } from "@/querys/usePosts";
import { useGetMyWorkScraps } from "@/querys/useScrap";
import { useTab } from "@/hooks/useTab";
import { useNavigation } from "@/hooks/useNavigation";
import { useWorkTransform } from "@/hooks/useWorkTransform";
import {
  usePostTransform,
  useContentItemTransform,
} from "@/hooks/usePostTransform";
import type { PostResponseDto } from "@/querys/types";

type CategoryTabsTab = "홈" | "신규" | "관심";

export const Interests: FC = () => {
  const { activeTab, onTabChange: setActiveTab } =
    useTab<CategoryTabsTab>("관심");
  const { navigateToNew, navigateToHome, navigateToContent } = useNavigation();

  // 스크랩된 작품 목록 조회
  const { data: scrappedWorks } = useGetMyWorkScraps();
  const favoriteSeries = useWorkTransform(scrappedWorks);

  // 선택된 작품 ID
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);

  // 스크랩된 작품이 로드되면 첫 번째 작품을 기본 선택
  useEffect(() => {
    if (scrappedWorks && scrappedWorks.length > 0 && !selectedWorkId) {
      setSelectedWorkId(scrappedWorks[0].id);
    }
  }, [scrappedWorks, selectedWorkId]);

  // 선택된 작품의 EPISODE 목록 조회 (최신화) - useGetEpisodesByWork 사용
  const { data: episodesData } = useGetEpisodesByWork(selectedWorkId ?? 0);
  // 최신순 정렬 (createdAt 기준 내림차순)
  const sortedEpisodes = useMemo(() => {
    if (!episodesData) return [];
    return [...episodesData].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [episodesData]);
  const latestUpdates = useContentItemTransform(
    sortedEpisodes.length > 0 ? sortedEpisodes : undefined,
    4,
  );

  // 선택된 작품의 모든 포스트 조회 (work_id로 연결된 모든 포스트) - SeriesDetail과 동일한 로직
  const { data: workEpisodesData } = useGetWorkEpisodes(selectedWorkId ?? 0);
  // 선택된 작품의 원작 참조 포스트 목록 조회 (parentWorkId로 연결된 포스트)
  const { data: derivativePostsData } = useGetDerivativePosts(
    selectedWorkId ?? 0,
  );

  // Post 타입과 파생 포스트를 합침 (SeriesDetail과 동일한 로직)
  const universePosts = useMemo(() => {
    const posts: PostResponseDto[] = [];
    // Post 타입 포스트 추가 (work_id로 연결된 POST 타입)
    if (workEpisodesData) {
      const postTypePosts = workEpisodesData.filter(
        (post) => post.postType === "POST",
      );
      posts.push(...postTypePosts);
    }
    // 파생 포스트 추가 (parentWorkId로 연결된 포스트)
    if (derivativePostsData) {
      posts.push(...derivativePostsData);
    }
    return posts;
  }, [workEpisodesData, derivativePostsData]);

  // 최신순 정렬
  const sortedUniversePosts = useMemo(() => {
    if (!universePosts) return [];
    return [...universePosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [universePosts]);
  const newPosts = usePostTransform(
    sortedUniversePosts.length > 0 ? sortedUniversePosts : undefined,
    9,
  );

  // 2차 창작 작품 목록 조회 (신규 유니버스)
  const { data: allDerivativeWorks } = useGetAllWorks("DERIVATIVE");
  const filteredDerivativeWorks = useMemo(() => {
    if (!allDerivativeWorks || !selectedWorkId) return [];
    // parentWorkId가 선택된 작품 ID와 일치하는 DERIVATIVE 작품만 필터링
    return allDerivativeWorks.filter(
      (work) => work.parentWorkId === selectedWorkId,
    );
  }, [allDerivativeWorks, selectedWorkId]);
  const newUniverseSeries = useWorkTransform(
    filteredDerivativeWorks.slice(0, 6),
  );

  const handleTabChange = useCallback(
    (tab: CategoryTabsTab) => {
      setActiveTab(tab);
      if (tab === "신규") {
        navigateToNew();
      } else if (tab === "홈") {
        navigateToHome();
      }
    },
    [setActiveTab, navigateToNew, navigateToHome],
  );

  const handleContentClick = useCallback(
    (id: string) => {
      navigateToContent(id);
    },
    [navigateToContent],
  );

  const handleSeriesClick = useCallback((seriesId: string) => {
    const workId = Number(seriesId);
    if (!isNaN(workId)) {
      setSelectedWorkId(workId);
    }
  }, []);

  return (
    <InterestsView
      activeTab={activeTab}
      onTabChange={handleTabChange}
      favoriteSeries={favoriteSeries}
      latestUpdates={latestUpdates}
      newPosts={newPosts}
      newUniverseSeries={newUniverseSeries}
      selectedWorkId={selectedWorkId}
      onContentClick={handleContentClick}
      onSeriesClick={handleSeriesClick}
    />
  );
};

export default Interests;
