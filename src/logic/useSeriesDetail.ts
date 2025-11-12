import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  // Extract series ID from URL path (e.g., /series/123 -> "123")
  const seriesId = useMemo(() => {
    const match = location.pathname.match(/\/series\/([^/]+)/);
    return match ? match[1] : "";
  }, [location.pathname]);

  const [activeTab, setActiveTab] = useState<"episodes" | "universe">(
    "episodes",
  );
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [seriesData, setSeriesData] = useState<{
    imageUrl: string;
    universeName: string;
    seriesName: string;
    authorName: string;
    description: string;
    category: string;
    rating: number;
    views: number;
    isSerializing: boolean;
    tags: string[];
    likes: number;
  } | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [universeWorks, setUniverseWorks] = useState<UniverseWork[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!series || !seriesId) return;
    let alive = true;
    series.getSeriesDetail(seriesId).then((data) => {
      if (alive) setSeriesData(data);
    });
    series.getEpisodes(seriesId).then((data) => {
      if (alive) setEpisodes(data);
    });
    series.getUniverseWorks(seriesId).then((data) => {
      if (alive) setUniverseWorks(data);
    });
    series.getPopularPosts(seriesId).then((data) => {
      if (alive) setPopularPosts(data);
    });
    return () => {
      alive = false;
    };
  }, [series, seriesId]);

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
