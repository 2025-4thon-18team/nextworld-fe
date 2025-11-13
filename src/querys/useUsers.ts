import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type { ProfileUpdateRequest } from "./types";
import { authKeys } from "./useAuth";

// ============================================
// API 함수
// ============================================

export const usersApi = {
  // 프로필 수정 (multipart/form-data)
  updateProfile: (data: ProfileUpdateRequest) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    formData.append("contactEmail", data.contactEmail);
    formData.append("twitter", data.twitter);
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }
    return client.put<void>("/api/mypage/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
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
