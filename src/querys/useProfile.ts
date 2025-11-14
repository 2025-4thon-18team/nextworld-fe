// src/querys/useProfile.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateMyProfile } from "@/utils/profileApi";

export const useMyProfile = () =>
  useQuery({
    queryKey: ["profile", "me"],
    queryFn: getMyProfile,
  });

export const useUpdateMyProfile = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["profile", "me"],  // ← v5 방식
      });
    },
  });
};
