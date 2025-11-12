import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  UserProfileResponse,
} from "./types";

// ============================================
// API 함수
// ============================================

export const authApi = {
  // 회원가입
  signup: (data: SignupRequest) =>
    client.post<SignupResponse>("/api/auth/signup", data),

  // 로그인
  login: (data: LoginRequest) =>
    client.post<LoginResponse>("/api/auth/login", data),

  // 로그아웃
  logout: () => client.post<string>("/api/auth/logout"),

  // 토큰 재발급 (백엔드에서 직접 문자열 반환)
  refresh: () => client.post<string>("/api/auth/refresh"),

  // 내 정보 조회
  me: () => client.get<UserProfileResponse>("/api/auth/me"),
};

// ============================================
// Query Keys
// ============================================

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Query: 내 계정 정보 조회
export const useGetMe = () => {
  return useQuery({
    queryKey: ["useGetMe", ...authKeys.me()],
    queryFn: async () => {
      const response = await authApi.me();
      return response.data;
    },
  });
};

// Mutation: 회원가입
export const useSignup = () => {
  return useMutation({
    mutationKey: ["useSignup"],
    mutationFn: async (data: SignupRequest) => {
      const response = await authApi.signup(data);
      return response.data;
    },
  });
};

// Mutation: 로그인
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useLogin"],
    mutationFn: async (data: LoginRequest) => {
      const response = await authApi.login(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};

// Mutation: 로그아웃
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useLogout"],
    mutationFn: async () => {
      const response = await authApi.logout();
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

// Mutation: 액세스 토큰 재발급 (백엔드에서 직접 문자열 반환)
export const useRefreshToken = () => {
  return useMutation({
    mutationKey: ["useRefreshToken"],
    mutationFn: async () => {
      const response = await authApi.refresh();
      return response.data; // 문자열 (새로운 accessToken)
    },
  });
};
