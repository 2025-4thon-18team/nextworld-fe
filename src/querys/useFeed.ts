import { useQuery } from "@tanstack/react-query";
import { client } from "./client";
import type { ListResponse } from "./types";

// ============================================
// API 함수
// ============================================

export const feedApi = {
  // 작품/포스트 통합 검색 (keyword 쿼리 파라미터 필수)
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
  search: (keyword: string) => [...feedKeys.all, "search", keyword] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Query: 작품/포스트 통합 검색
export const useSearch = (keyword: string) => {
  return useQuery({
    queryKey: ["useSearch", ...feedKeys.search(keyword)],
    queryFn: async () => {
      const response = await feedApi.search(keyword);
      return response.data;
    },
    enabled: !!keyword && keyword.trim().length > 0, // 검색어가 있을 때만 호출
  });
};

