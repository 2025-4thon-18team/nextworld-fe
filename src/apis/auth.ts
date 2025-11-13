import { client } from "./client";

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  userId: string;
  email: string;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    userId: string;
    email: string;
    nickname: string;
  };
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface MeResponse {
  userId: string;
  email: string;
  nickname: string;
  profileImage?: string;
  createdAt: string;
}

export const authApi = {
  signup: (data: SignupRequest) =>
    client.post<{ data: SignupResponse }>("/api/auth/signup", data),

  login: (data: LoginRequest) =>
    client.post<{ data: LoginResponse }>("/api/auth/login", data),

  logout: () => client.post<{ message: string }>("/api/auth/logout"),

  refresh: () => client.post<{ data: RefreshResponse }>("/api/auth/refresh"),

  me: () => client.get<{ data: MeResponse }>("/api/auth/me"),
};
