import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type { LikeResponse } from "./types";

// ============================================
// API 함수
// ============================================

export const likeApi = {
  // 좋아요 등록
  like: (workId: number) => client.post<LikeResponse>(`/api/likes/${workId}`),

  // 좋아요 취소
  unlike: (workId: number) => client.delete<string>(`/api/likes/${workId}`),
};

// ============================================
// Query Keys
// ============================================

export const likeKeys = {
  all: ["likes"] as const,
  work: (workId: number) => [...likeKeys.all, "work", workId] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 좋아요 등록
export const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useLike"],
    mutationFn: async (workId: number) => {
      const response = await likeApi.like(workId);
      return response.data;
    },
    onSuccess: (_, workId) => {
      queryClient.invalidateQueries({ queryKey: likeKeys.work(workId) });
    },
  });
};

// Mutation: 좋아요 취소
export const useUnlike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUnlike"],
    mutationFn: async (workId: number) => {
      const response = await likeApi.unlike(workId);
      return response.data;
    },
    onSuccess: (_, workId) => {
      queryClient.invalidateQueries({ queryKey: likeKeys.work(workId) });
    },
  });
};
