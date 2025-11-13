import { client } from "./client";

export interface UpdateProfileRequest {
  nickname?: string;
  profileImage?: string;
  bio?: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  nickname: string;
  profileImage?: string;
  bio?: string;
  updatedAt: string;
}

export const usersApi = {
  updateProfile: (data: UpdateProfileRequest) =>
    client.patch<{ data: UserProfile }>("/api/users/me/profile", data),
};
