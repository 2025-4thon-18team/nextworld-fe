import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { SeriesPort } from "@/services/types";

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

export function useSeriesDetail(params: { series?: SeriesPort }) {
  const { series } = params;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"episodes" | "universe">("episodes");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  // Mock data - will be replaced with actual API calls
  const seriesData = useMemo(
    () => ({
      imageUrl: "https://via.placeholder.com/409x453",
      universeName: "유니버스명",
      seriesName: "작품명",
      authorName: "작가명",
      description:
        "작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품소개작품소개작품소개작품소개작품소개작품소개작품소개작품소개작품소개작품 소개작품 소개작품 소개작품 소개",
      category: "장르 | 자유 연재",
      rating: 4.4,
      views: 44,
      isSerializing: true,
      tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
      likes: 33,
    }),
    [],
  );

  const episodes: Episode[] = useMemo(
    () => [
      {
        id: "1",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "2",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "3",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "4",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "5",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "6",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "7",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "8",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
    ],
    [],
  );

  const universeWorks: UniverseWork[] = useMemo(
    () => [
      {
        id: "1",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "2",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "3",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "4",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "5",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "6",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
    ],
    [],
  );

  const popularPosts: Post[] = useMemo(
    () => [
      {
        id: "1",
        title: "그녀가 웃던 마지막 봄날",
        points: 100,
        content: `"폐하, 또 도망치시네요."\n그 미소는 기억보다 더 오래된, 저주처럼 달콤했다.....`,
        tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "2",
        title: "그녀가 웃던 마지막 봄날 2화",
        points: 100,
        content:
          "처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....",
        tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "3",
        title: "악녀 팬아트",
        points: 100,
        content: "그림 1장",
        tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "4",
        title: "그녀가 웃던 마지막 봄날",
        points: 100,
        content: `"폐하, 또 도망치시네요."\n그 미소는 기억보다 더 오래된, 저주처럼 달콤했다.....`,
        tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
    ],
    [],
  );

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

