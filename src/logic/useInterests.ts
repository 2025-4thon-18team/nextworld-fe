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

type ContentItemData = {
  id: string;
  title: string;
  points: number;
  rating: number;
  views: number;
  comments: number;
  date: string;
};

export function useInterests(params: { content?: ContentPort }) {
  const { content } = params;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HomeCategoryTab>("관심");
  const [favoriteSeries, setFavoriteSeries] = useState<SeriesItem[]>([]);
  const [latestUpdates, setLatestUpdates] = useState<ContentItemData[]>([]);
  const [newPosts, setNewPosts] = useState<PostItem[]>([]);
  const [newUniverseSeries, setNewUniverseSeries] = useState<SeriesItem[]>([]);

  useEffect(() => {
    if (!content) return;
    let alive = true;
    content.getFavoriteSeries().then((data) => {
      if (alive) setFavoriteSeries(data);
    });
    content.getLatestUpdates().then((data) => {
      if (alive) setLatestUpdates(data);
    });
    content.getNewPosts().then((data) => {
      if (alive) setNewPosts(data);
    });
    content.getNewUniverseSeries().then((data) => {
      if (alive) setNewUniverseSeries(data);
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
      } else if (tab === "홈") {
        navigate("/");
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

  const handleContentClick = useCallback(
    (id: string) => {
      navigate(`/content/${id}`);
    },
    [navigate],
  );

  return {
    activeTab,
    onTabChange: handleTabChange,
    favoriteSeries,
    latestUpdates,
    newPosts,
    newUniverseSeries,
    onSeriesClick: handleSeriesClick,
    onPostClick: handlePostClick,
    onContentClick: handleContentClick,
  };
}
