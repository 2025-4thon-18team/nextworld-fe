import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import { useAuthStore } from "@/stores/authStore";
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

  // 로그아웃 (Authorization 헤더 필요)
  logout: () => client.post<void>("/api/auth/logout"),

  // 토큰 재발급 (Refresh-Token 헤더 필요, BaseResponse<String> 반환)
  refresh: () => {
    const { refreshToken } = useAuthStore.getState();
    return client.post<string>(
      "/api/auth/refresh",
      {},
      {
        headers: {
          "Refresh-Token": refreshToken || "",
        },
      },
    );
  },

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
export const useGetMe = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["useGetMe", ...authKeys.me()],
    queryFn: async () => {
      const response = await authApi.me();
      return response.data;
    },
    enabled: options?.enabled !== false,
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
  const clearTokens = useAuthStore((state) => state.clearTokens);

  return useMutation({
    mutationKey: ["useLogout"],
    mutationFn: async () => {
      const response = await authApi.logout();
      return response.data;
    },
    onSuccess: () => {
      clearTokens();
      queryClient.clear();
    },
  });
};

// Mutation: 액세스 토큰 재발급 (백엔드에서 직접 문자열 반환)
export const useRefreshToken = () => {
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationKey: ["useRefreshToken"],
    mutationFn: async () => {
      const response = await authApi.refresh();
      const newAccessToken = response.data; // 문자열 (새로운 accessToken)

      // 새로운 accessToken 저장 (refreshToken은 그대로 유지)
      const { refreshToken: currentRefreshToken } = useAuthStore.getState();
      if (currentRefreshToken) {
        setTokens({
          accessToken: newAccessToken,
          refreshToken: currentRefreshToken,
        });
      }

      return newAccessToken;
    },
  });
};

// Hook: 로그인 상태 확인
export const useIsAuthenticated = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return !!accessToken;
};
