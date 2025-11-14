import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type {
  ProfileUpdateRequest,
  AuthorProfileResponse,
  AuthorWorkResponse,
  AuthorPostResponse,
} from "./types";
import { authKeys } from "./useAuth";

// ============================================
// API 함수
// ============================================

export const usersApi = {
  // 프로필 수정 (multipart/form-data)
  updateProfile: (data: ProfileUpdateRequest) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.bio) formData.append("bio", data.bio);
    if (data.contactEmail) formData.append("contactEmail", data.contactEmail);
    if (data.twitter) formData.append("twitter", data.twitter);
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }
    return client.put<void>("/api/mypage/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 작가 프로필 조회
  getAuthorProfile: (authorId: number) =>
    client.get<AuthorProfileResponse>(`/api/author/${authorId}/profile`),

  // 작가 작품 조회
  getAuthorWorks: (authorId: number) =>
    client.get<AuthorWorkResponse[]>(`/api/author/${authorId}/works`),

  // 작가 포스트 조회
  getAuthorPosts: (authorId: number) =>
    client.get<AuthorPostResponse[]>(`/api/author/${authorId}/posts`),
};

// ============================================
// Query Keys
// ============================================

export const usersKeys = {
  all: ["users"] as const,
  author: (authorId: number) => [...usersKeys.all, "author", authorId] as const,
  authorProfile: (authorId: number) =>
    [...usersKeys.author(authorId), "profile"] as const,
  authorWorks: (authorId: number) =>
    [...usersKeys.author(authorId), "works"] as const,
  authorPosts: (authorId: number) =>
    [...usersKeys.author(authorId), "posts"] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 내 프로필 수정
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUpdateProfile"],
    mutationFn: async (data: ProfileUpdateRequest) => {
      await usersApi.updateProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};

// Query: 작가 프로필 조회
export const useGetAuthorProfile = (authorId: number) => {
  return useQuery({
    queryKey: ["useGetAuthorProfile", ...usersKeys.authorProfile(authorId)],
    queryFn: async () => {
      const response = await usersApi.getAuthorProfile(authorId);
      return response.data;
    },
    enabled: !!authorId,
  });
};

// Query: 작가 작품 조회
export const useGetAuthorWorks = (authorId: number) => {
  return useQuery({
    queryKey: ["useGetAuthorWorks", ...usersKeys.authorWorks(authorId)],
    queryFn: async () => {
      const response = await usersApi.getAuthorWorks(authorId);
      return response.data;
    },
    enabled: !!authorId,
  });
};

// Query: 작가 포스트 조회
export const useGetAuthorPosts = (authorId: number) => {
  return useQuery({
    queryKey: ["useGetAuthorPosts", ...usersKeys.authorPosts(authorId)],
    queryFn: async () => {
      const response = await usersApi.getAuthorPosts(authorId);
      return response.data;
    },
    enabled: !!authorId,
  });
};
