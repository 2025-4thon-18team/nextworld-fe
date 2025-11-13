import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type { PostRequestDto, PostResponseDto } from "./types";

// ============================================
// API 함수
// ============================================

export const postsApi = {
  // 포스트 생성 (AI 검수 포함)
  createPost: (data: PostRequestDto) =>
    client.post<PostResponseDto>("/api/works/posts", data),

  // 포스트 임시저장
  saveDraft: (data: PostRequestDto) =>
    client.post<PostResponseDto>("/api/works/posts/save", data),

  // 임시저장 포스트 이어서 작성
  continueDraft: (id: number, data: PostRequestDto) =>
    client.patch<PostResponseDto>(`/api/works/posts/continue/${id}`, data),

  // 임시저장 포스트 조회
  getDraftById: (id: number) =>
    client.get<PostResponseDto>(`/api/works/posts/drafts/${id}`),

  // 모든 임시저장 포스트 조회
  getAllDrafts: () => client.get<PostResponseDto[]>("/api/works/posts/drafts/all"),

  // 임시저장 포스트 삭제
  deleteDraft: (id: number) => client.delete<void>(`/api/works/posts/drafts/${id}`),
};

// ============================================
// Query Keys
// ============================================

export const postsKeys = {
  all: ["posts"] as const,
  lists: () => [...postsKeys.all, "list"] as const,
  drafts: () => [...postsKeys.all, "drafts"] as const,
  draft: (id: number) => [...postsKeys.drafts(), id] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 포스트 생성 (AI 검수 포함)
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

// Mutation: 임시저장 포스트 이어서 작성
export const useContinueDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useContinueDraft"],
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: PostRequestDto;
    }) => {
      const response = await postsApi.continueDraft(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.draft(variables.id) });
      queryClient.invalidateQueries({ queryKey: postsKeys.drafts() });
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

// Mutation: 임시저장 포스트 삭제
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

