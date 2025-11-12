import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type {
  UserProfileUpdateRequest,
  UserProfileResponse,
} from "./types";
import { authKeys } from "./useAuth";

// ============================================
// API 함수
// ============================================

export const usersApi = {
  // 프로필 수정
  updateProfile: (data: UserProfileUpdateRequest) =>
    client.patch<UserProfileResponse>("/api/users/me/profile", data),
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 내 프로필 수정
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUpdateProfile"],
    mutationFn: async (data: UserProfileUpdateRequest) => {
      const response = await usersApi.updateProfile(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
