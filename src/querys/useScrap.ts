import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type { ScrapResponse, WorkResponseDto } from "./types";

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
    client.delete<string>(`/api/scraps/works/${workId}`),

  // POST 스크랩 삭제
  unscrapPost: (postId: number) =>
    client.delete<string>(`/api/scraps/posts/${postId}`),

  // 스크랩된 작품 목록 조회
  // TODO: 백엔드 API가 추가되면 연결 필요
  getScrappedWorks: () =>
    client.get<WorkResponseDto[]>("/api/scraps/works"),
};

// ============================================
// Query Keys
// ============================================

export const scrapKeys = {
  all: ["scraps"] as const,
  works: () => [...scrapKeys.all, "works"] as const,
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
      const response = await scrapApi.unscrapWork(workId);
      return response.data;
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
      const response = await scrapApi.unscrapPost(postId);
      return response.data;
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: scrapKeys.post(postId) });
    },
  });
};

// Query: 스크랩된 작품 목록 조회
export const useGetScrappedWorks = () => {
  return useQuery({
    queryKey: ["useGetScrappedWorks", ...scrapKeys.works()],
    queryFn: async () => {
      const response = await scrapApi.getScrappedWorks();
      return response.data;
    },
  });
};
