import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllWorks } from "@/querys/useWorks";
import { useGetAllPosts } from "@/querys/usePosts";

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

export function useInterests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HomeCategoryTab>("관심");

  // React Query hooks 직접 사용
  // TODO: 백엔드에 관심 작품, 최신 업데이트, 신규 유니버스 API가 없어서 임시로 모든 작품/포스트 조회
  const { data: originalWorks } = useGetAllWorks("ORIGINAL");
  const { data: derivativeWorks } = useGetAllWorks("DERIVATIVE");
  const { data: postsData } = useGetAllPosts();

  const favoriteSeries = useMemo(() => {
    if (!originalWorks) return [];
    return originalWorks.slice(0, 5).map((work) => ({
      id: String(work.id),
      imageUrl: work.coverImageUrl,
      title: work.title,
      tags: work.tags,
    }));
  }, [originalWorks]);

  const latestUpdates = useMemo(() => {
    if (!postsData) return [];
    return postsData.slice(0, 4).map((post) => ({
      id: String(post.id),
      title: post.title,
      points: post.price || 0,
      rating: post.rating,
      views: post.viewsCount,
      comments: post.commentsCount,
      date: post.createdAt,
    }));
  }, [postsData]);

  const newPosts = useMemo(() => {
    if (!postsData) return [];
    return postsData.slice(0, 9).map((post) => ({
      id: String(post.id),
      title: post.title,
      content: post.content.substring(0, 100) + "...",
      points: post.price || 0,
      tags: post.tags,
      rating: post.rating,
      views: post.viewsCount,
      comments: post.commentsCount,
      date: post.createdAt,
    }));
  }, [postsData]);

  const newUniverseSeries = useMemo(() => {
    if (!derivativeWorks) return [];
    return derivativeWorks.slice(0, 6).map((work) => ({
      id: String(work.id),
      imageUrl: work.coverImageUrl,
      title: work.title,
      tags: work.tags,
    }));
  }, [derivativeWorks]);

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
