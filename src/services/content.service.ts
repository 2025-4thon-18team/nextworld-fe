import type { ContentPort } from "./types";

const contentPortInstance: ContentPort = {
  async getUniverseOfWeek() {
    // TODO: 실제 API 호출로 교체
    return {
      id: "1",
      imageUrl: "https://via.placeholder.com/310x476",
      title: "[작품 제목]",
      tags: ["현대로맨스", "판타지"],
    };
  },
  async getPopularSeries() {
    // TODO: 실제 API 호출로 교체
    return [
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
  },
  async getPopularPosts() {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: "1",
        title: "그녀가 웃던 마지막 봄날 2화",
        content:
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
        points: 100,
        tags: ["현대로맨스", "판타지"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
    ];
  },
  async getNewSeries() {
    // TODO: 실제 API 호출로 교체
    return [
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
  },
  async getNewPosts() {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: "1",
        title: "그녀가 웃던 마지막 봄날 2화",
        content:
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
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
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
        points: 100,
        tags: ["현대로맨스", "판타지"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
    ];
  },
  async getFavoriteSeries() {
    // TODO: 실제 API 호출로 교체
    return [
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
  },
  async getLatestUpdates() {
    // TODO: 실제 API 호출로 교체
    return [
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
  },
  async getNewUniverseSeries() {
    // TODO: 실제 API 호출로 교체
    return [
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
  },
};

export function createContentPort(): ContentPort {
  return contentPortInstance;
}
