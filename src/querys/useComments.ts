import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type {
  CreateCommentRequest,
  UpdateCommentRequest,
  CommentResponse,
} from "./types";

// ============================================
// API 함수
// ============================================

export const commentsApi = {
  // 댓글 생성
  createComment: (postId: number, data: CreateCommentRequest) =>
    client.post<CommentResponse>(`/api/posts/${postId}/comments`, data),

  // 댓글 생성순 조회 (인증 불필요)
  getComments: (postId: number) =>
    client.get<CommentResponse[]>(`/api/posts/${postId}/comments`),

  // 댓글 수정
  updateComment: (commentId: number, data: UpdateCommentRequest) =>
    client.put<CommentResponse>(`/api/posts/comments/${commentId}`, data),

  // 댓글 삭제
  deleteComment: (commentId: number) =>
    client.delete<void>(`/api/posts/comments/${commentId}`),
};

// ============================================
// Query Keys
// ============================================

export const commentsKeys = {
  all: ["comments"] as const,
  post: (postId: number) => [...commentsKeys.all, "post", postId] as const,
  comment: (commentId: number) => [...commentsKeys.all, "comment", commentId] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 댓글 생성
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useCreateComment"],
    mutationFn: async ({
      postId,
      data,
    }: {
      postId: number;
      data: CreateCommentRequest;
    }) => {
      const response = await commentsApi.createComment(postId, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.post(variables.postId) });
    },
  });
};

// Query: 댓글 생성순 조회
export const useGetComments = (postId: number) => {
  return useQuery({
    queryKey: ["useGetComments", ...commentsKeys.post(postId)],
    queryFn: async () => {
      const response = await commentsApi.getComments(postId);
      return response.data;
    },
    enabled: !!postId,
  });
};

// Mutation: 댓글 수정
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUpdateComment"],
    mutationFn: async ({
      commentId,
      data,
      postId,
    }: {
      commentId: number;
      data: UpdateCommentRequest;
      postId: number;
    }) => {
      const response = await commentsApi.updateComment(commentId, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.post(variables.postId) });
    },
  });
};

// Mutation: 댓글 삭제
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDeleteComment"],
    mutationFn: async ({
      commentId,
      postId,
    }: {
      commentId: number;
      postId: number;
    }) => {
      await commentsApi.deleteComment(commentId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.post(variables.postId) });
    },
  });
};

