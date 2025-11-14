import { FC, useCallback, useState, useMemo, useEffect } from "react";
import { InterestsView } from "./InterestsView";
import { useGetWorkEpisodes, useGetDerivativePosts } from "@/querys/useWorks";
import { useGetMyWorkScraps } from "@/querys/useScrap";
import { useTab } from "@/hooks/useTab";
import { useNavigation } from "@/hooks/useNavigation";
import { useWorkTransform } from "@/hooks/useWorkTransform";
import {
  usePostTransform,
  useContentItemTransform,
} from "@/hooks/usePostTransform";

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

  // 선택된 작품의 회차 목록 조회 (최신화)
  const { data: episodesData } = useGetWorkEpisodes(selectedWorkId ?? 0);
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

  // 선택된 작품의 원작 참조 포스트 목록 조회 (신규 포스트)
  const { data: derivativePostsData } = useGetDerivativePosts(
    selectedWorkId ?? 0,
  );
  // 최신순 정렬
  const sortedDerivativePosts = useMemo(() => {
    if (!derivativePostsData) return [];
    return [...derivativePostsData].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [derivativePostsData]);
  const newPosts = usePostTransform(
    sortedDerivativePosts.length > 0 ? sortedDerivativePosts : undefined,
    9,
  );

  // 스크랩된 작품 중 DERIVATIVE 타입인 것들을 필터링 (신규 유니버스)
  const filteredDerivativeWorks = useMemo(() => {
    if (!scrappedWorks || !selectedWorkId) return [];
    // parentWorkId가 선택된 작품 ID와 일치하는 DERIVATIVE 작품만 필터링
    return scrappedWorks.filter(
      (work) =>
        work.workType === "DERIVATIVE" && work.parentWorkId === selectedWorkId,
    );
  }, [scrappedWorks, selectedWorkId]);
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
