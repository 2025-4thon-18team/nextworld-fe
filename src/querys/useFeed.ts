import { useQuery } from "@tanstack/react-query";
import { client } from "./client";
import type { ListResponse } from "./types";

// ============================================
// API 함수
// ============================================

export const feedApi = {
  // 최근 피드 조회 (인증 불필요)
  getRecentFeed: () => client.get<ListResponse>("/api/feed/recent"),

  // 작품/포스트 통합 검색 (인증 불필요)
  search: (keyword: string) =>
    client.get<ListResponse>("/api/search", {
      params: { keyword },
    }),
};

// ============================================
// Query Keys
// ============================================

export const feedKeys = {
  all: ["feed"] as const,
  recent: () => [...feedKeys.all, "recent"] as const,
  search: (keyword: string) => [...feedKeys.all, "search", keyword] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Query: 최근 피드 조회
export const useGetRecentFeed = () => {
  return useQuery({
    queryKey: ["useGetRecentFeed", ...feedKeys.recent()],
    queryFn: async () => {
      const response = await feedApi.getRecentFeed();
      return response.data;
    },
  });
};

// Query: 작품/포스트 통합 검색
export const useSearch = (keyword: string) => {
  return useQuery({
    queryKey: ["useSearch", ...feedKeys.search(keyword)],
    queryFn: async () => {
      const response = await feedApi.search(keyword);
      return response.data;
    },
    enabled: !!keyword && keyword.trim().length > 0,
  });
};

