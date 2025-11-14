import { useState, useMemo, useCallback } from "react";
import { SeriesDetailView } from "./SeriesDetailView";
import {
  useGetWorkById,
  useGetWorkEpisodes,
  useGetDerivativePosts,
  useGetAllWorks,
} from "@/querys/useWorks";
import { useLike, useUnlike } from "@/querys/useLike";
import { useScrapWork, useUnscrapWork } from "@/querys/useScrap";
import { useGetMe } from "@/querys/useAuth";
import { useTab } from "@/hooks/useTab";
import { useNavigation } from "@/hooks/useNavigation";
import {
  usePostTransform,
  useEpisodeTransform,
} from "@/hooks/usePostTransform";
import { useSeriesId } from "@/hooks/useUrlParams";
import { useSort, useSortLabels } from "@/hooks/useSort";
import type { PostResponseDto } from "@/querys/types";
import { toast } from "sonner";

const SeriesDetail = () => {
  const { activeTab, onTabChange } = useTab<"episodes" | "universe">(
    "episodes",
  );
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const { navigateToSeriesContent, navigateToPost } = useNavigation();

  // Extract series ID from URL path
  const seriesId = useSeriesId();

  // React Query hooks 직접 사용
  const { data: workData } = useGetWorkById(seriesId || 0);
  const { data: episodesData } = useGetWorkEpisodes(seriesId || 0);
  const { data: derivativePostsData } = useGetDerivativePosts(seriesId || 0);
  const { data: allDerivativeWorks } = useGetAllWorks("DERIVATIVE");
  const { data: currentUser } = useGetMe();

  // 좋아요 및 스크랩 API
  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();
  const { mutate: scrapWork } = useScrapWork();
  const { mutate: unscrapWork } = useUnscrapWork();

  // 좋아요/스크랩 상태 (실제로는 백엔드에서 조회 필요)
  const [isLiked, setIsLiked] = useState(false);
  const [isScrapped, setIsScrapped] = useState(false);

  const seriesData = useMemo(() => {
    if (!workData) return null;
    return {
      imageUrl: workData.coverImageUrl || "",
      universeName: workData.parentWorkTitle ?? "",
      seriesName: workData.title || "",
      authorName: workData.authorName || "",
      description: workData.description || "",
      category: workData.category || "",
      rating: workData.totalRating != null ? workData.totalRating : 0,
      views: workData.totalViewsCount ?? 0,
      schedule: workData.serializationSchedule ?? null,
      isSerializing:
        workData.serializationSchedule != null &&
        workData.serializationSchedule !== "완결",
      tags: workData.tags ?? [],
      likes: workData.totalLikesCount ?? 0,
    };
  }, [workData]);

  // Episode 타입만 회차 탭에 표시
  const episodePosts = useMemo(() => {
    if (!episodesData) return [];
    return episodesData.filter((post) => post.postType === "EPISODE");
  }, [episodesData]);

  // Post 타입과 파생 포스트를 유니버스 탭에 표시
  const universePosts = useMemo(() => {
    const posts: PostResponseDto[] = [];
    // Post 타입 포스트 추가
    if (episodesData) {
      const postTypePosts = episodesData.filter(
        (post) => post.postType === "POST",
      );
      posts.push(...postTypePosts);
    }
    // 파생 포스트 추가
    if (derivativePostsData) {
      posts.push(...derivativePostsData);
    }
    return posts;
  }, [episodesData, derivativePostsData]);

  const episodes = useEpisodeTransform(episodePosts);
  const popularPosts = usePostTransform(universePosts, 4);

  // 2차 창작 작품 목록 조회 (유니버스 작품)
  const universeWorks = useMemo(() => {
    if (!allDerivativeWorks || !seriesId) return [];
    // parentWorkId가 현재 작품 ID와 일치하는 DERIVATIVE 작품만 필터링
    const filteredWorks = allDerivativeWorks.filter(
      (work) => work.parentWorkId === seriesId,
    );
    // WorkResponseDto를 UniverseWork 형태로 변환
    return filteredWorks.map((work) => ({
      id: String(work.id),
      imageUrl: work.coverImageUrl,
      title: work.title,
      tags: work.tags || [],
    }));
  }, [allDerivativeWorks, seriesId]);

  const sortedEpisodes = useSort(episodes, sortOrder);
  const { main: filterLabel, sub: filterSubLabel } = useSortLabels(sortOrder);

  const onViewFirstEpisode = useCallback(() => {
    if (sortedEpisodes.length > 0) {
      navigateToSeriesContent(seriesId, sortedEpisodes[0].id);
    }
  }, [navigateToSeriesContent, seriesId, sortedEpisodes]);

  const onEpisodeClick = useCallback(
    (id: string) => {
      navigateToSeriesContent(seriesId, id);
    },
    [navigateToSeriesContent, seriesId],
  );

  const onPostClick = useCallback(
    (id: string) => {
      navigateToPost(id);
    },
    [navigateToPost],
  );

  const onLike = useCallback(() => {
    if (!seriesId) return;

    if (isLiked) {
      unlike(seriesId, {
        onSuccess: () => {
          setIsLiked(false);
        },
        onError: () => {
          toast("좋아요 취소에 실패했습니다.");
        },
      });
    } else {
      like(seriesId, {
        onSuccess: () => {
          setIsLiked(true);
        },
        onError: () => {
          toast("좋아요에 실패했습니다.");
        },
      });
    }
  }, [seriesId, isLiked, like, unlike]);

  const onInterest = useCallback(() => {
    if (!seriesId) return;

    if (isScrapped) {
      unscrapWork(seriesId, {
        onSuccess: () => {
          setIsScrapped(false);
        },
        onError: () => {
          toast("스크랩 취소에 실패했습니다.");
        },
      });
    } else {
      scrapWork(seriesId, {
        onSuccess: () => {
          setIsScrapped(true);
        },
        onError: () => {
          toast("스크랩에 실패했습니다.");
        },
      });
    }
  }, [seriesId, isScrapped, scrapWork, unscrapWork]);

  const onShare = useCallback(() => {
    // TODO: Implement share functionality
    toast.error("아직 준비 중인 기능입니다.");
  }, []);

  const onFilterToggle = useCallback(() => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  }, []);

  // 작가인지 확인
  const isAuthor = currentUser && workData?.authorName === currentUser.nickname;

  const onEditWork = useCallback(() => {
    // TODO: 작품 수정 페이지로 이동
    toast.error("아직 준비 중인 기능입니다.");
  }, []);

  if (!seriesData) {
    return (
      <SeriesDetailView
        imageUrl=""
        universeName=""
        seriesName="작품 정보를 찾을 수 없습니다."
        authorName="작가 정보를 찾을 수 없습니다."
        description=""
        onViewFirstEpisode={onViewFirstEpisode}
        category=""
        rating={0}
        views={0}
        schedule={null}
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
      onEditWork={isAuthor ? onEditWork : undefined}
      category={seriesData.category}
      rating={seriesData.rating}
      views={seriesData.views}
      schedule={seriesData.schedule}
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
