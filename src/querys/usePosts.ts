import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type { PostRequestDto, PostResponseDto } from "./types";

// ============================================
// API 함수
// ============================================

export const postsApi = {
  // 독립 포스트 생성
  createPost: (data: PostRequestDto) =>
    client.post<PostResponseDto>("/api/posts", data),

  // 작품 회차 생성
  createWorkPost: (workId: number, data: PostRequestDto) =>
    client.post<PostResponseDto>(`/api/posts/works/${workId}`, data),

  // 포스트 목록 조회
  getAllPosts: () => client.get<PostResponseDto[]>("/api/posts"),

  getAllWorkPosts: (workId: number) =>
    client.get<PostResponseDto[]>("/api/posts", {
      params: { workId },
    }),

  // 포스트 상세 조회
  getPostById: (id: number) => client.get<PostResponseDto>(`/api/posts/${id}`),

  // 포스트 임시저장
  saveDraft: (data: PostRequestDto) =>
    client.post<PostResponseDto>("/api/posts/drafts", data),

  // 임시저장 목록 조회
  getAllDrafts: () => client.get<PostResponseDto[]>("/api/posts/drafts"),

  // 임시저장 단일 조회
  getDraftById: (id: number) =>
    client.get<PostResponseDto>(`/api/posts/drafts/${id}`),

  // 포스트 수정
  updatePost: (id: number, data: PostRequestDto) =>
    client.put<PostResponseDto>(`/api/posts/${id}`, data),

  // 포스트 삭제
  deletePost: (id: number) => client.delete<void>(`/api/posts/${id}`),

  // 임시저장 수정
  updateDraft: (id: number, data: PostRequestDto) =>
    client.put<PostResponseDto>(`/api/posts/drafts/${id}`, data),

  // 임시저장 삭제
  deleteDraft: (id: number) => client.delete<void>(`/api/posts/drafts/${id}`),

  // 에피소드 전체 조회
  getAllEpisodes: () => client.get<PostResponseDto[]>("/api/episodes"),

  // 작품 회차 목록 조회
  getEpisodesByWork: (workId: number) =>
    client.get<PostResponseDto[]>(`/api/episodes/work/${workId}`),

  // 이전 회차 조회
  getPreviousEpisode: (id: number) =>
    client.get<PostResponseDto>(`/api/episodes/${id}/previous`),

  // 다음 회차 조회
  getNextEpisode: (id: number) =>
    client.get<PostResponseDto>(`/api/episodes/${id}/next`),
};

// ============================================
// Query Keys
// ============================================

export const postsKeys = {
  all: ["posts"] as const,
  lists: () => [...postsKeys.all, "list"] as const,
  detail: (id: number) => [...postsKeys.all, "detail", id] as const,
  drafts: () => [...postsKeys.all, "drafts"] as const,
  draft: (id: number) => [...postsKeys.drafts(), id] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 독립 포스트 생성
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useCreatePost"],
    mutationFn: async (data: PostRequestDto) => {
      const response = await postsApi.createPost(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
    },
  });
};

// Mutation: 작품 회차 생성
export const useCreateWorkPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useCreateWorkPost"],
    mutationFn: async ({
      workId,
      data,
    }: {
      workId: number;
      data: PostRequestDto;
    }) => {
      const response = await postsApi.createWorkPost(workId, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
    },
  });
};

// Query: 포스트 목록 조회
export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["useGetAllPosts", ...postsKeys.lists()],
    queryFn: async () => {
      const response = await postsApi.getAllPosts();
      return response.data;
    },
  });
};

// Query: 작품 포스트 목록 조회

export const useGetAllWorkPosts = (workId: number) => {
  return useQuery({
    queryKey: ["useGetAllWorkPosts", ...postsKeys.lists(), workId],
    queryFn: async () => {
      const response = await postsApi.getAllWorkPosts(workId);
      return response.data;
    },
  });
};

// Query: 포스트 상세 조회
export const useGetPostById = (id: number) => {
  return useQuery({
    queryKey: ["useGetPostById", ...postsKeys.detail(id)],
    queryFn: async () => {
      const response = await postsApi.getPostById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Mutation: 포스트 임시저장
export const useSaveDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useSaveDraft"],
    mutationFn: async (data: PostRequestDto) => {
      const response = await postsApi.saveDraft(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.drafts() });
    },
  });
};

// Mutation: 포스트 수정
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUpdatePost"],
    mutationFn: async ({ id, data }: { id: number; data: PostRequestDto }) => {
      const response = await postsApi.updatePost(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: postsKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
    },
  });
};

// Mutation: 포스트 삭제
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDeletePost"],
    mutationFn: async (id: number) => {
      await postsApi.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
    },
  });
};

// Query: 임시저장 포스트 조회
export const useGetDraftById = (id: number) => {
  return useQuery({
    queryKey: ["useGetDraftById", ...postsKeys.draft(id)],
    queryFn: async () => {
      const response = await postsApi.getDraftById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Query: 모든 임시저장 포스트 조회
export const useGetAllDrafts = () => {
  return useQuery({
    queryKey: ["useGetAllDrafts", ...postsKeys.drafts()],
    queryFn: async () => {
      const response = await postsApi.getAllDrafts();
      return response.data;
    },
  });
};

// Mutation: 임시저장 수정
export const useUpdateDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUpdateDraft"],
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: PostRequestDto;
    }) => {
      const response = await postsApi.updateDraft(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.drafts() });
    },
  });
};

// Mutation: 임시저장 삭제
export const useDeleteDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDeleteDraft"],
    mutationFn: async (id: number) => {
      await postsApi.deleteDraft(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.drafts() });
    },
  });
};

// Query: 에피소드 전체 조회
export const useGetAllEpisodes = () => {
  return useQuery({
    queryKey: ["useGetAllEpisodes", ...postsKeys.lists()],
    queryFn: async () => {
      const response = await postsApi.getAllEpisodes();
      return response.data;
    },
  });
};

// Query: 작품 회차 목록 조회
export const useGetEpisodesByWork = (workId: number) => {
  return useQuery({
    queryKey: ["useGetEpisodesByWork", ...postsKeys.lists(), workId],
    queryFn: async () => {
      const response = await postsApi.getEpisodesByWork(workId);
      return response.data;
    },
    enabled: !!workId,
  });
};

// Query: 이전 회차 조회
export const useGetPreviousEpisode = (id: number) => {
  return useQuery({
    queryKey: ["useGetPreviousEpisode", ...postsKeys.detail(id), "previous"],
    queryFn: async () => {
      const response = await postsApi.getPreviousEpisode(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Query: 다음 회차 조회
export const useGetNextEpisode = (id: number) => {
  return useQuery({
    queryKey: ["useGetNextEpisode", ...postsKeys.detail(id), "next"],
    queryFn: async () => {
      const response = await postsApi.getNextEpisode(id);
      return response.data;
    },
    enabled: !!id,
  });
};
