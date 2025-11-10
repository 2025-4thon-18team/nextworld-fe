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

export function useNew() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HomeCategoryTab>("신규");

  // Mock data
  const newSeries: SeriesItem[] = [
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
    {
      id: "7",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "8",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "9",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "10",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "11",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
    },
    {
      id: "12",
      imageUrl: "https://via.placeholder.com/203x305",
      title: "[작품 제목]",
      tags: ["현대로맨스"],
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
    {
      id: "9",
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

