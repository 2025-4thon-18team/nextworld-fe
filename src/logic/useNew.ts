import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { ContentPort } from "@/services/types";

type HomeCategoryTab = "홈" | "신규" | "관심";

type SeriesItem = {
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

export function useNew(params: { content?: ContentPort }) {
  const { content } = params;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HomeCategoryTab>("신규");
  const [newSeries, setNewSeries] = useState<SeriesItem[]>([]);
  const [newPosts, setNewPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    if (!content) return;
    let alive = true;
    content.getNewSeries().then((data) => {
      if (alive) setNewSeries(data);
    });
    content.getNewPosts().then((data) => {
      if (alive) setNewPosts(data);
    });
    return () => {
      alive = false;
    };
  }, [content]);

  const handleTabChange = useCallback(
    (tab: HomeCategoryTab) => {
      setActiveTab(tab);
      if (tab === "홈") {
        navigate("/");
      } else if (tab === "관심") {
        navigate("/interests");
      }
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
    newSeries,
    newPosts,
    onSeriesClick: handleSeriesClick,
    onPostClick: handlePostClick,
  };
}

