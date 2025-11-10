import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

export function useHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<HomeCategoryTab>("홈");

  // Mock data - in real app, this would come from services/ports
  const universeOfWeek: UniverseItem | null = {
    id: "1",
    imageUrl: "https://via.placeholder.com/310x476",
    title: "[작품 제목]",
    tags: ["현대로맨스", "판타지"],
  };

  const popularSeries: SeriesItem[] = [
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
  ];

  const popularPosts: PostItem[] = [
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
    {
      id: "5",
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
      id: "6",
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
      id: "7",
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
      id: "8",
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

