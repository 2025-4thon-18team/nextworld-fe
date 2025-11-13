import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type {
  WorkRequestDto,
  WorkResponseDto,
  WorkTypeEnum,
  PostResponseDto,
} from "./types";

// ============================================
// API 함수
// ============================================

export const worksApi = {
  // 작품 생성
  createWork: (data: WorkRequestDto) =>
    client.post<WorkResponseDto>("/api/works", data),

  // 작품 목록 조회 (workType 필터링 가능)
  getAllWorks: (workType?: WorkTypeEnum) =>
    client.get<WorkResponseDto[]>("/api/works", {
      params: workType ? { workType } : undefined,
    }),

  // 작품 상세 조회
  getWorkById: (id: number) => client.get<WorkResponseDto>(`/api/works/${id}`),

  // 작품의 회차 목록 조회
  getWorkEpisodes: (workId: number) =>
    client.get<PostResponseDto[]>(`/api/works/${workId}/posts`),

  // 작품의 원작 참조 포스트 목록 조회
  getDerivativePosts: (workId: number) =>
    client.get<PostResponseDto[]>(`/api/works/${workId}/derivatives`),

  // 작품 삭제
  deleteWork: (id: number) => client.delete<string>(`/api/works/${id}`),
};

// ============================================
// Query Keys
// ============================================

export const worksKeys = {
  all: ["works"] as const,
  lists: () => [...worksKeys.all, "list"] as const,
  detail: (id: number) => [...worksKeys.all, "detail", id] as const,
  episodes: (workId: number) => [...worksKeys.all, "episodes", workId] as const,
  derivatives: (workId: number) =>
    [...worksKeys.all, "derivatives", workId] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 작품 생성
export const useCreateWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useCreateWork"],
    mutationFn: async (data: WorkRequestDto) => {
      const response = await worksApi.createWork(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: worksKeys.lists() });
    },
  });
};

// Query: 작품 목록 조회
export const useGetAllWorks = (workType?: WorkTypeEnum) => {
  return useQuery({
    queryKey: ["useGetAllWorks", ...worksKeys.lists(), workType],
    queryFn: async () => {
      const response = await worksApi.getAllWorks(workType);
      return response.data;
    },
  });
};

// Query: 작품 상세 조회
export const useGetWorkById = (id: number) => {
  return useQuery({
    queryKey: ["useGetWorkById", ...worksKeys.detail(id)],
    queryFn: async () => {
      const response = await worksApi.getWorkById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Query: 작품의 회차 목록 조회
export const useGetWorkEpisodes = (workId: number) => {
  return useQuery({
    queryKey: ["useGetWorkEpisodes", ...worksKeys.episodes(workId)],
    queryFn: async () => {
      const response = await worksApi.getWorkEpisodes(workId);
      return response.data;
    },
    enabled: !!workId,
  });
};

// Query: 작품의 원작 참조 포스트 목록 조회
export const useGetDerivativePosts = (workId: number) => {
  return useQuery({
    queryKey: ["useGetDerivativePosts", ...worksKeys.derivatives(workId)],
    queryFn: async () => {
      const response = await worksApi.getDerivativePosts(workId);
      return response.data;
    },
    enabled: !!workId,
  });
};

// Mutation: 작품 삭제
export const useDeleteWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDeleteWork"],
    mutationFn: async (id: number) => {
      const response = await worksApi.deleteWork(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: worksKeys.lists() });
    },
  });
};
