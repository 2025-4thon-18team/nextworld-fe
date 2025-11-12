import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type { PayItemResponse } from "./types";

// ============================================
// API 함수
// ============================================

export const adminApi = {
  // 결제 목록 조회 (환불 요청 목록)
  getPayments: () => client.get<PayItemResponse[]>("/api/admin/payments"),

  // 환불 처리 (백엔드에서 문자열 반환)
  refundPayment: (payId: number) =>
    client.patch<string>(`/api/admin/payments/${payId}/refund`),
};

// ============================================
// Query Keys
// ============================================

export const adminKeys = {
  all: ["admin"] as const,
  payments: () => [...adminKeys.all, "payments"] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Query: 결제 목록 조회
export const useGetPayments = () => {
  return useQuery({
    queryKey: ["useGetPayments", ...adminKeys.payments()],
    queryFn: async () => {
      const response = await adminApi.getPayments();
      return response.data;
    },
  });
};

// Mutation: 환불 처리
export const useRefundPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useRefundPayment"],
    mutationFn: async (payId: number) => {
      const response = await adminApi.refundPayment(payId);
      return response.data; // string
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.payments() });
    },
  });
};
