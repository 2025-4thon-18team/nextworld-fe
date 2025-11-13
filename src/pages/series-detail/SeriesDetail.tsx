import { useState, useMemo, useCallback } from "react";
import { SeriesDetailView } from "./SeriesDetailView";
import {
  useGetWorkById,
  useGetWorkEpisodes,
  useGetDerivativePosts,
} from "@/querys/useWorks";
import { useGetAllPosts } from "@/querys/usePosts";
import { useTab } from "@/hooks/useTab";
import { useNavigation } from "@/hooks/useNavigation";
import {
  usePostTransform,
  useEpisodeTransform,
} from "@/hooks/usePostTransform";
import { useSeriesId } from "@/hooks/useUrlParams";
import { useSort, useSortLabels } from "@/hooks/useSort";

const SeriesDetail = () => {
  const { activeTab, onTabChange } = useTab<"episodes" | "universe">(
    "episodes",
  );
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const { navigateToViewer, navigateToPost } = useNavigation();

  // Extract series ID from URL path
  const seriesId = useSeriesId();

  // React Query hooks 직접 사용
  const { data: workData } = useGetWorkById(seriesId);
  const { data: episodesData } = useGetWorkEpisodes(seriesId);
  const { data: derivativePostsData } = useGetDerivativePosts(seriesId);
  const { data: allPostsData } = useGetAllPosts(seriesId || undefined);

  const seriesData = useMemo(() => {
    if (!workData) return null;
    return {
      imageUrl: workData.coverImageUrl,
      universeName: workData.parentWorkTitle || "",
      seriesName: workData.title,
      authorName: workData.authorName,
      description: workData.description,
      category: workData.category,
      rating: Number(workData.totalRating),
      views: workData.totalViewsCount,
      isSerializing: true, // TODO: 백엔드에 연재 상태 필드가 없음
      tags: workData.tags,
      likes: workData.totalLikesCount,
    };
  }, [workData]);

  const episodes = useEpisodeTransform(episodesData);
  const popularPosts = usePostTransform(allPostsData, 4);

  const universeWorks = useMemo(() => {
    // TODO: PostResponseDto를 Work 형태로 변환 필요, 임시로 빈 배열 반환
    return [];
  }, []);

  const sortedEpisodes = useSort(episodes, sortOrder);
  const { main: filterLabel, sub: filterSubLabel } = useSortLabels(sortOrder);

  const onViewFirstEpisode = useCallback(() => {
    if (sortedEpisodes.length > 0) {
      navigateToViewer(sortedEpisodes[0].id);
    }
  }, [navigateToViewer, sortedEpisodes]);

  const onEpisodeClick = useCallback(
    (id: string) => {
      navigateToViewer(id);
    },
    [navigateToViewer],
  );

  const onPostClick = useCallback(
    (id: string) => {
      navigateToPost(id);
    },
    [navigateToPost],
  );

  const onLike = useCallback(() => {
    // TODO: Implement like functionality
    console.log("Like clicked");
  }, []);

  const onInterest = useCallback(() => {
    // TODO: Implement interest functionality
    console.log("Interest clicked");
  }, []);

  const onShare = useCallback(() => {
    // TODO: Implement share functionality
    console.log("Share clicked");
  }, []);

  const onFilterToggle = useCallback(() => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  }, []);

  if (!seriesData) {
    return (
      <SeriesDetailView
        imageUrl=""
        universeName=""
        seriesName=""
        authorName=""
        description=""
        onViewFirstEpisode={onViewFirstEpisode}
        category=""
        rating={0}
        views={0}
        isSerializing={false}
        tags={[]}
        likes={0}
        onLike={onLike}
        onInterest={onInterest}
        onShare={onShare}
        activeTab={activeTab}
        totalEpisodes={0}
        episodes={[]}
        universeWorks={[]}
        popularPosts={[]}
        filterLabel={filterLabel}
        filterSubLabel={filterSubLabel}
        onTabChange={onTabChange}
        onEpisodeClick={onEpisodeClick}
        onPostClick={onPostClick}
        onFilterToggle={onFilterToggle}
      />
    );
  }

  return (
    <SeriesDetailView
      imageUrl={seriesData.imageUrl}
      universeName={seriesData.universeName}
      seriesName={seriesData.seriesName}
      authorName={seriesData.authorName}
      description={seriesData.description}
      onViewFirstEpisode={onViewFirstEpisode}
      category={seriesData.category}
      rating={seriesData.rating}
      views={seriesData.views}
      isSerializing={seriesData.isSerializing}
      tags={seriesData.tags}
      likes={seriesData.likes}
      onLike={onLike}
      onInterest={onInterest}
      onShare={onShare}
      activeTab={activeTab}
      totalEpisodes={episodes.length}
      episodes={sortedEpisodes}
      universeWorks={universeWorks}
      popularPosts={popularPosts}
      filterLabel={filterLabel}
      filterSubLabel={filterSubLabel}
      onTabChange={onTabChange}
      onEpisodeClick={onEpisodeClick}
      onPostClick={onPostClick}
      onFilterToggle={onFilterToggle}
    />
  );
};

export default SeriesDetail;
