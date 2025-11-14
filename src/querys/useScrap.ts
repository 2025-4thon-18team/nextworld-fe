import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type { ScrapResponse, WorkResponseDto, PostResponseDto } from "./types";

// ============================================
// API 함수
// ============================================

export const scrapApi = {
  // WORK 스크랩 등록
  scrapWork: (workId: number) =>
    client.post<ScrapResponse>(`/api/scraps/works/${workId}`),

  // POST 스크랩 등록
  scrapPost: (postId: number) =>
    client.post<ScrapResponse>(`/api/scraps/posts/${postId}`),

  // WORK 스크랩 삭제
  unscrapWork: (workId: number) =>
    client.delete<void>(`/api/scraps/works/${workId}`),

  // POST 스크랩 삭제
  unscrapPost: (postId: number) =>
    client.delete<void>(`/api/scraps/posts/${postId}`),

  // 내 북마크 WORK 리스트 조회
  getMyWorkScraps: () =>
    client.get<WorkResponseDto[]>("/api/mypage/scraps/works"),

  // 내 북마크 POST 리스트 조회
  getMyPostScraps: () =>
    client.get<PostResponseDto[]>("/api/mypage/scraps/posts"),
};

// ============================================
// Query Keys
// ============================================

export const scrapKeys = {
  all: ["scraps"] as const,
  works: () => [...scrapKeys.all, "works"] as const,
  posts: () => [...scrapKeys.all, "posts"] as const,
  work: (workId: number) => [...scrapKeys.all, "work", workId] as const,
  post: (postId: number) => [...scrapKeys.all, "post", postId] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: WORK 스크랩 등록
export const useScrapWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useScrapWork"],
    mutationFn: async (workId: number) => {
      const response = await scrapApi.scrapWork(workId);
      return response.data;
    },
    onSuccess: (_, workId) => {
      queryClient.invalidateQueries({ queryKey: scrapKeys.work(workId) });
    },
  });
};

// Mutation: POST 스크랩 등록
export const useScrapPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useScrapPost"],
    mutationFn: async (postId: number) => {
      const response = await scrapApi.scrapPost(postId);
      return response.data;
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: scrapKeys.post(postId) });
    },
  });
};

// Mutation: WORK 스크랩 삭제
export const useUnscrapWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUnscrapWork"],
    mutationFn: async (workId: number) => {
      await scrapApi.unscrapWork(workId);
    },
    onSuccess: (_, workId) => {
      queryClient.invalidateQueries({ queryKey: scrapKeys.work(workId) });
    },
  });
};

// Mutation: POST 스크랩 삭제
export const useUnscrapPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUnscrapPost"],
    mutationFn: async (postId: number) => {
      await scrapApi.unscrapPost(postId);
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: scrapKeys.post(postId) });
    },
  });
};

// Query: 내 북마크 WORK 리스트 조회
export const useGetMyWorkScraps = () => {
  return useQuery({
    queryKey: ["useGetMyWorkScraps", ...scrapKeys.works()],
    queryFn: async () => {
      const response = await scrapApi.getMyWorkScraps();
      return response.data;
    },
  });
};

// Query: 내 북마크 POST 리스트 조회
export const useGetMyPostScraps = () => {
  return useQuery({
    queryKey: ["useGetMyPostScraps", ...scrapKeys.posts()],
    queryFn: async () => {
      const response = await scrapApi.getMyPostScraps();
      return response.data;
    },
  });
};
