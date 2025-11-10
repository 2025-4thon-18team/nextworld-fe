import type { SeriesPort } from "./types";

const seriesPortInstance: SeriesPort = {
  async getMySeries() {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: 1,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 2,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 3,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 4,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 5,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 6,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
    ];
  },
  async getLibrarySeries() {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: 1,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 2,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 3,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 4,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 5,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
      {
        id: 6,
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
      },
    ];
  },
  async getSeriesDetail(id: string) {
    // TODO: 실제 API 호출로 교체
    return {
      imageUrl: "https://via.placeholder.com/409x453",
      universeName: "유니버스명",
      seriesName: "작품명",
      authorName: "작가명",
      description:
        "작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품 소개작품소개작품소개작품소개작품소개작품소개작품소개작품소개작품소개작품소개작품 소개작품 소개작품 소개작품 소개",
      category: "장르 | 자유 연재",
      rating: 4.4,
      views: 44,
      isSerializing: true,
      tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
      likes: 33,
    };
  },
  async getEpisodes(seriesId: string) {
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
      {
        id: "5",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "6",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "7",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "8",
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
    ];
  },
  async getUniverseWorks(seriesId: string) {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: "1",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "2",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "3",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "4",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "5",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
      {
        id: "6",
        imageUrl: "https://via.placeholder.com/150x225",
        title: "[작품 제목]",
        tags: ["현대로맨스", "현대로맨스"],
      },
    ];
  },
  async getPopularPosts(seriesId: string) {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: "1",
        title: "그녀가 웃던 마지막 봄날",
        points: 100,
        content: `"폐하, 또 도망치시네요."\n그 미소는 기억보다 더 오래된, 저주처럼 달콤했다.....`,
        tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "2",
        title: "그녀가 웃던 마지막 봄날 2화",
        points: 100,
        content:
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
        tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "3",
        title: "악녀 팬아트",
        points: 100,
        content: "그림 1장",
        tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
      {
        id: "4",
        title: "그녀가 웃던 마지막 봄날",
        points: 100,
        content: `"폐하, 또 도망치시네요."\n그 미소는 기억보다 더 오래된, 저주처럼 달콤했다.....`,
        tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      },
    ];
  },
  async searchOriginalSeries(query: string) {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: "1",
        imageUrl: "https://via.placeholder.com/134x201",
        title: "[작품 제목]",
      },
      {
        id: "2",
        imageUrl: "https://via.placeholder.com/134x201",
        title: "[작품 제목]",
      },
      {
        id: "3",
        imageUrl: "https://via.placeholder.com/134x201",
        title: "[작품 제목]",
      },
      {
        id: "4",
        imageUrl: "https://via.placeholder.com/134x201",
        title: "[작품 제목]",
      },
      {
        id: "5",
        imageUrl: "https://via.placeholder.com/134x201",
        title: "[작품 제목]",
      },
    ];
  },
};

export function createSeriesPort(): SeriesPort {
  return seriesPortInstance;
}
