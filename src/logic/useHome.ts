import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { ContentPort } from "@/services/types";

type HomeCategoryTab = "홈" | "신규" | "관심";

type UniverseItem = {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
};

type PostItem = {
  id: string;
  title: string;
  content: string;
  points: number;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  date: string;
};

type SeriesItem = {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
};

export function useHome(params: { content?: ContentPort }) {
  const { content } = params;
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<HomeCategoryTab>("홈");
  const [universeOfWeek, setUniverseOfWeek] = useState<UniverseItem | null>(
    null,
  );
  const [popularSeries, setPopularSeries] = useState<SeriesItem[]>([]);
  const [popularPosts, setPopularPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    if (!content) return;
    let alive = true;
    content.getUniverseOfWeek().then((data) => {
      if (alive) setUniverseOfWeek(data);
    });
    content.getPopularSeries().then((data) => {
      if (alive) setPopularSeries(data);
    });
    content.getPopularPosts().then((data) => {
      if (alive) setPopularPosts(data);
    });
    return () => {
      alive = false;
    };
  }, [content]);

  const handleTabChange = useCallback(
    (tab: HomeCategoryTab) => {
      setActiveTab(tab);
      if (tab === "신규") {
        navigate("/new");
      } else if (tab === "관심") {
        navigate("/interests");
      } else {
        navigate("/");
      }
    },
    [navigate],
  );

  const handleUniverseClick = useCallback(
    (id: string) => {
      navigate(`/series/${id}`);
    },
    [navigate],
  );

  const handleSeriesClick = useCallback(
    (id: string) => {
      navigate(`/series/${id}`);
    },
    [navigate],
  );

  const handlePostClick = useCallback(
    (id: string) => {
      navigate(`/post/${id}`);
    },
    [navigate],
  );

  return {
    activeTab,
    onTabChange: handleTabChange,
    universeOfWeek,
    popularSeries,
    popularPosts,
    onUniverseClick: handleUniverseClick,
    onSeriesClick: handleSeriesClick,
    onPostClick: handlePostClick,
  };
}

