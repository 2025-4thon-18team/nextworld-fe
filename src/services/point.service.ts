import type { PointPort } from "./types";

const pointPortInstance: PointPort = {
  async getChargeHistory() {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: 1,
        title: "포인트 충전",
        date: "2025.10.23 00:00:00",
        points: 100,
      },
      {
        id: 2,
        title: "포인트 충전",
        date: "2025.10.23 00:00:00",
        points: 100,
      },
      {
        id: 3,
        title: "포인트 충전",
        date: "2025.10.23 00:00:00",
        points: 100,
      },
      {
        id: 4,
        title: "포인트 충전",
        date: "2025.10.23 00:00:00",
        points: 100,
      },
      {
        id: 5,
        title: "포인트 충전",
        date: "2025.10.23 00:00:00",
        points: 100,
      },
      {
        id: 6,
        title: "포인트 충전",
        date: "2025.10.23 00:00:00",
        points: 100,
      },
    ];
  },
  async getUsageHistory() {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: 1,
        type: "post" as const,
        title: "포스트명",
        subtitle: "@naooung 구매",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 2,
        type: "post" as const,
        title: "포스트명",
        subtitle: "@naooung 구매",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 3,
        type: "post" as const,
        title: "포스트명",
        subtitle: "@naooung 구매",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 4,
        type: "post" as const,
        title: "포스트명",
        subtitle: "@naooung 구매",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 5,
        type: "post" as const,
        title: "포스트명",
        subtitle: "@naooung 구매",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 6,
        type: "post" as const,
        title: "포스트명",
        subtitle: "@naooung 구매",
        points: 100,
        date: "2025.10.23",
      },
    ];
  },
};

export function createPointPort(): PointPort {
  return pointPortInstance;
}
