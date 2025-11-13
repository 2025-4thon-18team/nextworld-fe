import { client } from "./client";

export interface Work {
  workId: string;
  title: string;
  content: string;
  type: "original" | "derivative";
  authorId: string;
  authorName: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  thumbnailUrl?: string;
}

export interface MyWorksResponse {
  works: Work[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface MyBookmarksResponse {
  works: Work[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface PointsResponse {
  totalPoints: number;
  availablePoints: number;
  lockedPoints: number;
}

export interface PaymentHistory {
  transactionId: string;
  type: "charge" | "use" | "refund";
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  description?: string;
}

export interface PaylistResponse {
  payments: PaymentHistory[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface RevenueResponse {
  totalRevenue: number;
  availableRevenue: number;
  pendingRevenue: number;
  revenueHistory: {
    date: string;
    amount: number;
    source: string;
  }[];
}

export const mypageApi = {
  getMyWorks: (params?: { page?: number; pageSize?: number }) =>
    client.get<{ data: MyWorksResponse }>("/api/mypage/works", { params }),

  getMyBookmarks: (params?: { page?: number; pageSize?: number }) =>
    client.get<{ data: MyBookmarksResponse }>("/api/mypage/bookmarks", {
      params,
    }),

  getMyPoints: () => client.get<{ data: PointsResponse }>("/api/mypage/points"),

  getPaylist: (params?: { page?: number; pageSize?: number }) =>
    client.get<{ data: PaylistResponse }>("/api/mypage/paylist", { params }),

  getRevenue: () =>
    client.get<{ data: RevenueResponse }>("/api/mypage/revenue"),
};
