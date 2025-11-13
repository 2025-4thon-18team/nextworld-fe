import { useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetWorkById, useGetWorkEpisodes, useGetDerivativePosts } from "@/querys/useWorks";
import { useGetAllPosts } from "@/querys/usePosts";

interface Episode {
  id: string;
  title: string;
  points: number;
  rating: number;
  views: number;
  comments: number;
  date: string;
}

interface UniverseWork {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
}

interface Post {
  id: string;
  title: string;
  points: number;
  content: string;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  date: string;
}

export function useSeriesDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract series ID from URL path (e.g., /series/123 -> "123")
  const seriesId = useMemo(() => {
    const match = location.pathname.match(/\/series\/([^/]+)/);
    return match ? parseInt(match[1]) : 0;
  }, [location.pathname]);

  const [activeTab, setActiveTab] = useState<"episodes" | "universe">(
    "episodes",
  );
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  
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

  const episodes = useMemo(() => {
    if (!episodesData) return [];
    return episodesData.map((post) => ({
      id: String(post.id),
      title: post.title,
      points: post.price || 0,
      rating: post.rating,
      views: post.viewsCount,
      comments: post.commentsCount,
      date: post.createdAt,
    }));
  }, [episodesData]);

  const universeWorks = useMemo(() => {
    // TODO: PostResponseDto를 Work 형태로 변환 필요, 임시로 빈 배열 반환
    return [];
  }, []);

  const popularPosts = useMemo(() => {
    if (!allPostsData) return [];
    return allPostsData.slice(0, 4).map((post) => ({
      id: String(post.id),
      title: post.title,
      points: post.price || 0,
      content: post.content.substring(0, 100) + "...",
      tags: post.tags,
      rating: post.rating,
      views: post.viewsCount,
      comments: post.commentsCount,
      date: post.createdAt,
    }));
  }, [allPostsData]);

  const sortedEpisodes = useMemo(() => {
    const sorted = [...episodes];
    if (sortOrder === "oldest") {
      return sorted.reverse();
    }
    return sorted;
  }, [episodes, sortOrder]);

  const filterLabel = useMemo(() => {
    return sortOrder === "latest" ? "최신순" : "1화부터";
  }, [sortOrder]);

  const filterSubLabel = useMemo(() => {
    return sortOrder === "latest" ? "| 1화부터" : "| 최신순";
  }, [sortOrder]);

  const onTabChange = useCallback((tab: "episodes" | "universe") => {
    setActiveTab(tab);
  }, []);

  const onViewFirstEpisode = useCallback(() => {
    if (sortedEpisodes.length > 0) {
      navigate(`/viewer?episode=${sortedEpisodes[0].id}`);
    }
  }, [navigate, sortedEpisodes]);

  const onEpisodeClick = useCallback(
    (id: string) => {
      navigate(`/viewer?episode=${id}`);
    },
    [navigate],
  );

  const onUniverseWorkClick = useCallback(
    (id: string) => {
      navigate(`/series/${id}`);
    },
    [navigate],
  );

  const onPostClick = useCallback(
    (id: string) => {
      navigate(`/post/${id}`);
    },
    [navigate],
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
    return {
      imageUrl: "",
      universeName: "",
      seriesName: "",
      authorName: "",
      description: "",
      onViewFirstEpisode,
      category: "",
      rating: 0,
      views: 0,
      isSerializing: false,
      tags: [],
      likes: 0,
      onLike,
      onInterest,
      onShare,
      activeTab,
      totalEpisodes: 0,
      episodes: [],
      universeWorks: [],
      popularPosts: [],
      filterLabel,
      filterSubLabel,
      onTabChange,
      onEpisodeClick,
      onUniverseWorkClick,
      onPostClick,
      onFilterToggle,
    };
  }

  return {
    // Hero section
    imageUrl: seriesData.imageUrl,
    universeName: seriesData.universeName,
    seriesName: seriesData.seriesName,
    authorName: seriesData.authorName,
    description: seriesData.description,
    onViewFirstEpisode,

    // Content info sidebar
    category: seriesData.category,
    rating: seriesData.rating,
    views: seriesData.views,
    isSerializing: seriesData.isSerializing,
    tags: seriesData.tags,
    likes: seriesData.likes,
    onLike,
    onInterest,
    onShare,

    // Content section
    activeTab,
    totalEpisodes: episodes.length,
    episodes: sortedEpisodes,
    universeWorks,
    popularPosts,
    filterLabel,
    filterSubLabel,
    onTabChange,
    onEpisodeClick,
    onUniverseWorkClick,
    onPostClick,
    onFilterToggle,
  };
}
