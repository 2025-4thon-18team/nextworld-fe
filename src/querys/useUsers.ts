import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, UpdateProfileRequest } from "../apis/users";
import { authKeys } from "./useAuth";

// Mutation: 내 프로필 수정
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUpdateProfile"],
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await usersApi.updateProfile(data);
      return response.data.data;
    },
    onSuccess: () => {
      // 프로필 수정 후 me 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
