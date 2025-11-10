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
};

export function createSeriesPort(): SeriesPort {
  return seriesPortInstance;
}
