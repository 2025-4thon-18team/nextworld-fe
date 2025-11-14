import { useQuery } from "@tanstack/react-query";
import { client } from "./client";
import type {
  PointsResponse,
  PayItemResponse,
} from "./types";

// ============================================
// API 함수
// ============================================

export const mypageApi = {
  // 포인트 조회
  getPoints: () => client.get<PointsResponse>("/api/mypage/points"),

  // 결제 내역 조회
  getPaylist: () => client.get<PayItemResponse[]>("/api/mypage/paylist"),
};

// ============================================
// Query Keys
// ============================================

export const mypageKeys = {
  all: ["mypage"] as const,
  points: () => [...mypageKeys.all, "points"] as const,
  paylist: () => [...mypageKeys.all, "paylist"] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Query: 내 포인트
export const useGetMyPoints = () => {
  return useQuery({
    queryKey: ["useGetMyPoints", ...mypageKeys.points()],
    queryFn: async () => {
      const response = await mypageApi.getPoints();
      return response.data;
    },
  });
};

// Query: 포인트 결제 내역
export const useGetPaylist = () => {
  return useQuery({
    queryKey: ["useGetPaylist", ...mypageKeys.paylist()],
    queryFn: async () => {
      const response = await mypageApi.getPaylist();
      return response.data;
    },
  });
};
