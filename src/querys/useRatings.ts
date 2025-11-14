import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type { PostRatingRequest, PostRatingResponse } from "./types";

// ============================================
// API 함수
// ============================================

export const ratingsApi = {
  // 포스트 별점 등록/수정
  ratePost: (postId: number, data: PostRatingRequest) =>
    client.post<PostRatingResponse>(`/api/posts/${postId}/rating`, data),

  // 내가 준 별점 조회
  getMyRating: (postId: number) =>
    client.get<PostRatingResponse>(`/api/posts/${postId}/rating/me`),

  // 포스트 별점 요약
  getRatingSummary: (postId: number) =>
    client.get<PostRatingResponse>(`/api/posts/${postId}/rating/summary`),
};

// ============================================
// Query Keys
// ============================================

export const ratingsKeys = {
  all: ["ratings"] as const,
  post: (postId: number) => [...ratingsKeys.all, "post", postId] as const,
  myRating: (postId: number) => [...ratingsKeys.post(postId), "me"] as const,
  summary: (postId: number) => [...ratingsKeys.post(postId), "summary"] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 포스트 별점 등록/수정
export const useRatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useRatePost"],
    mutationFn: async ({
      postId,
      data,
    }: {
      postId: number;
      data: PostRatingRequest;
    }) => {
      const response = await ratingsApi.ratePost(postId, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ratingsKeys.myRating(variables.postId),
      });
      queryClient.invalidateQueries({
        queryKey: ratingsKeys.summary(variables.postId),
      });
    },
  });
};

// Query: 내가 준 별점 조회
export const useGetMyRating = (postId: number) => {
  return useQuery({
    queryKey: ["useGetMyRating", ...ratingsKeys.myRating(postId)],
    queryFn: async () => {
      const response = await ratingsApi.getMyRating(postId);
      return response.data;
    },
    enabled: !!postId,
  });
};

// Query: 포스트 별점 요약
export const useGetRatingSummary = (postId: number) => {
  return useQuery({
    queryKey: ["useGetRatingSummary", ...ratingsKeys.summary(postId)],
    queryFn: async () => {
      const response = await ratingsApi.getRatingSummary(postId);
      return response.data;
    },
    enabled: !!postId,
  });
};

