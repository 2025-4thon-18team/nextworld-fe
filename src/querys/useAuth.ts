import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, LoginRequest, SignupRequest } from "../apis/auth";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

// Query: 내 계정 정보 조회
export const useGetMe = () => {
  return useQuery({
    queryKey: ["useGetMe", ...authKeys.me()],
    queryFn: async () => {
      const response = await authApi.me();
      return response.data.data;
    },
  });
};

// Mutation: 회원가입
export const useSignup = () => {
  return useMutation({
    mutationKey: ["useSignup"],
    mutationFn: async (data: SignupRequest) => {
      const response = await authApi.signup(data);
      return response.data.data;
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
      return response.data.data;
    },
    onSuccess: () => {
      // 로그인 성공 시 me 쿼리 무효화
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
      // 로그아웃 시 모든 쿼리 무효화
      queryClient.clear();
    },
  });
};

// Mutation: 액세스 토큰 재발급
export const useRefreshToken = () => {
  return useMutation({
    mutationKey: ["useRefreshToken"],
    mutationFn: async () => {
      const response = await authApi.refresh();
      return response.data.data;
    },
  });
};
