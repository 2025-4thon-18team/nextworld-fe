import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

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

  // Mock data
  const favoriteSeries: SeriesItem[] = [
    {
      id: "1",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스", "판타지"],
    },
    {
      id: "2",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "3",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "4",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "5",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
  ];

  const latestUpdates: ContentItemData[] = [
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
  ];

  const newPosts: PostItem[] = [
    {
      id: "1",
      title: "그녀가 웃던 마지막 봄날 2화",
      content:
        "처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. \"이번엔 제발 죽게 해주세요.\" ....",
      points: 100,
      tags: ["현대로맨스", "판타지"],
      rating: 4.4,
      views: 44,
      comments: 44,
      date: "2025.10.01",
    },
    {
      id: "2",
      title: "그녀가 웃던 마지막 봄날 2화",
      content:
        "처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. \"이번엔 제발 죽게 해주세요.\" ....",
      points: 100,
      tags: ["현대로맨스", "판타지"],
      rating: 4.4,
      views: 44,
      comments: 44,
      date: "2025.10.01",
    },
    {
      id: "3",
      title: "그녀가 웃던 마지막 봄날 2화",
      content:
        "처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. \"이번엔 제발 죽게 해주세요.\" ....",
      points: 100,
      tags: ["현대로맨스", "판타지"],
      rating: 4.4,
      views: 44,
      comments: 44,
      date: "2025.10.01",
    },
    {
      id: "4",
      title: "그녀가 웃던 마지막 봄날 2화",
      content:
        "처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. \"이번엔 제발 죽게 해주세요.\" ....",
      points: 100,
      tags: ["현대로맨스", "판타지"],
      rating: 4.4,
      views: 44,
      comments: 44,
      date: "2025.10.01",
    },
  ];

  const newUniverseSeries: SeriesItem[] = [
    {
      id: "1",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "2",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "3",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "4",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "5",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "6",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
  ];

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

