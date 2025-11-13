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

export function useNew() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HomeCategoryTab>("신규");
  
  // React Query hooks 직접 사용
  // TODO: 백엔드에 신규 작품/포스트 API가 없어서 임시로 모든 작품/포스트 조회
  const { data: worksData } = useGetAllWorks("ORIGINAL");
  const { data: postsData } = useGetAllPosts();

  const newSeries = useMemo(() => {
    if (!worksData) return [];
    return worksData.slice(0, 12).map((work) => ({
      id: String(work.id),
      imageUrl: work.coverImageUrl,
      title: work.title,
      tags: work.tags,
    }));
  }, [worksData]);

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

