import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type {
  WorkRequestDto,
  WorkResponseDto,
} from "./types";

// ============================================
// API 함수
// ============================================

export const worksApi = {
  // 작품 생성
  createWork: (data: WorkRequestDto) =>
    client.post<WorkResponseDto>("/api/works", data),

  // 작품 이미지 업로드 (multipart/form-data)
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return client.post<string>("/api/works/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 작품 삭제
  deleteWork: (id: number) => client.delete<void>(`/api/works/${id}`),
};

// ============================================
// Query Keys
// ============================================

export const worksKeys = {
  all: ["works"] as const,
  lists: () => [...worksKeys.all, "list"] as const,
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

// Mutation: 작품 이미지 업로드
export const useUploadWorkImage = () => {
  return useMutation({
    mutationKey: ["useUploadWorkImage"],
    mutationFn: async (file: File) => {
      const response = await worksApi.uploadImage(file);
      return response.data; // 이미지 URL 반환
    },
  });
};

// Mutation: 작품 삭제
export const useDeleteWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDeleteWork"],
    mutationFn: async (id: number) => {
      await worksApi.deleteWork(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: worksKeys.lists() });
    },
  });
};
