import type { RevenuePort } from "./types";

const revenuePortInstance: RevenuePort = {
  async getRevenueData() {
    // TODO: 실제 API 호출로 교체
    return {
      totalSales: 213,
      totalRevenue: 100000,
      authorFee: 20000,
      platformFee: 10000,
    };
  },
  async getSalesHistory() {
    // TODO: 실제 API 호출로 교체
    return [
      {
        id: 1,
        contentTitle: "창작물명 창작물명 창작물명 창작물명",
        buyer: "naooung",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 2,
        contentTitle: "창작물명 창작물명 창작물명 창작물명",
        buyer: "naooung",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 3,
        contentTitle: "창작물명 창작물명 창작물명 창작물명",
        buyer: "naooung",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 4,
        contentTitle: "창작물명 창작물명 창작물명 창작물명",
        buyer: "naooung",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 5,
        contentTitle: "창작물명 창작물명 창작물명 창작물명",
        buyer: "naooung",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 6,
        contentTitle: "창작물명 창작물명 창작물명 창작물명",
        buyer: "naooung",
        points: 100,
        date: "2025.10.23",
      },
      {
        id: 7,
        contentTitle: "창작물명 창작물명 창작물명 창작물명",
        buyer: "naooung",
        points: 100,
        date: "2025.10.23",
      },
    ];
  },
};

export function createRevenuePort(): RevenuePort {
  return revenuePortInstance;
}
