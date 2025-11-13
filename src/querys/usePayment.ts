import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type {
  ChargeRequest,
  UseRequest,
  RefundRequest,
  VerifyRequest,
  ChargeOptionsResponse,
  PaymentHistoryResponse,
} from "./types";
import { mypageKeys } from "./useMypage";

// ============================================
// API 함수
// ============================================

export const paymentApi = {
  // 결제 검증 (백엔드에서 boolean 반환)
  verify: (data: VerifyRequest) =>
    client.post<boolean>("/api/payment/verify", data),

  // 포인트 사용 (백엔드에서 빈 응답)
  use: (data: UseRequest) => client.post<void>("/api/payment/use", data),

  // 환불 요청 (백엔드에서 빈 응답)
  refund: (data: RefundRequest) =>
    client.post<void>("/api/payment/refund", data),

  // 포인트 충전 (백엔드에서 빈 응답)
  charge: (data: ChargeRequest) =>
    client.post<void>("/api/payment/charge", data),

  // 충전 옵션 조회
  getOptions: () => client.get<ChargeOptionsResponse>("/api/payment/options"),

  // 사용 내역 조회
  getUsageHistory: () =>
    client.get<PaymentHistoryResponse[]>("/api/payment/history/use"),

  // 충전 내역 조회
  getChargeHistory: () =>
    client.get<PaymentHistoryResponse[]>("/api/payment/history/charge"),
};

// ============================================
// Query Keys
// ============================================

export const paymentKeys = {
  all: ["payment"] as const,
  options: () => [...paymentKeys.all, "options"] as const,
  usageHistory: () => [...paymentKeys.all, "usageHistory"] as const,
  chargeHistory: () => [...paymentKeys.all, "chargeHistory"] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 결제 검증
export const useVerifyPayment = () => {
  return useMutation({
    mutationKey: ["useVerifyPayment"],
    mutationFn: async (data: VerifyRequest) => {
      const response = await paymentApi.verify(data);
      return response.data; // boolean
    },
  });
};

// Mutation: 포인트 사용
export const useUsePoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUsePoints"],
    mutationFn: async (data: UseRequest) => {
      await paymentApi.use(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mypageKeys.points() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.usageHistory() });
    },
  });
};

// Mutation: 환불 요청
export const useRefundPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useRefundPayment"],
    mutationFn: async (data: RefundRequest) => {
      await paymentApi.refund(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mypageKeys.points() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.chargeHistory() });
    },
  });
};

// Mutation: 포인트 충전
export const useChargePoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useChargePoints"],
    mutationFn: async (data: ChargeRequest) => {
      await paymentApi.charge(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mypageKeys.points() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.chargeHistory() });
    },
  });
};

// Query: 충전 옵션 조회
export const useGetChargeOptions = () => {
  return useQuery({
    queryKey: ["useGetChargeOptions", ...paymentKeys.options()],
    queryFn: async () => {
      const response = await paymentApi.getOptions();
      return response.data;
    },
  });
};

// Query: 사용 내역 조회
export const useGetUsageHistory = () => {
  return useQuery({
    queryKey: ["useGetUsageHistory", ...paymentKeys.usageHistory()],
    queryFn: async () => {
      const response = await paymentApi.getUsageHistory();
      return response.data;
    },
  });
};

// Query: 충전 내역 조회
export const useGetChargeHistory = () => {
  return useQuery({
    queryKey: ["useGetChargeHistory", ...paymentKeys.chargeHistory()],
    queryFn: async () => {
      const response = await paymentApi.getChargeHistory();
      return response.data;
    },
  });
};
