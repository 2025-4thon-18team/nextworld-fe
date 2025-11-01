import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, RefundRequest, ResolveReportRequest } from "../apis/admin";

export const adminKeys = {
  all: ["admin"] as const,
  users: (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    search?: string;
  }) => [...adminKeys.all, "users", params] as const,
  payments: (params?: {
    page?: number;
    pageSize?: number;
    type?: string;
    status?: string;
  }) => [...adminKeys.all, "payments", params] as const,
  reports: (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    category?: string;
  }) => [...adminKeys.all, "reports", params] as const,
};

// Query: 전체 유저 목록 조회
export const useGetUsers = (params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["useGetUsers", ...adminKeys.users(params)],
    queryFn: async () => {
      const response = await adminApi.getUsers(params);
      return response.data.data;
    },
  });
};

// Query: 결제/환불 요청 조회
export const useGetPayments = (params?: {
  page?: number;
  pageSize?: number;
  type?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ["useGetPayments", ...adminKeys.payments(params)],
    queryFn: async () => {
      const response = await adminApi.getPayments(params);
      return response.data.data;
    },
  });
};

// Mutation: 특정 결제건 환불 처리
export const useRefundPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useRefundPayment"],
    mutationFn: async ({
      txId,
      data,
    }: {
      txId: string;
      data?: RefundRequest;
    }) => {
      const response = await adminApi.refundPayment(txId, data);
      return response.data.data;
    },
    onSuccess: () => {
      // 환불 처리 후 결제 내역 무효화
      queryClient.invalidateQueries({ queryKey: adminKeys.payments() });
    },
  });
};

// Query: 신고 목록 조회
export const useGetReports = (params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  category?: string;
}) => {
  return useQuery({
    queryKey: ["useGetReports", ...adminKeys.reports(params)],
    queryFn: async () => {
      const response = await adminApi.getReports(params);
      return response.data.data;
    },
  });
};

// Mutation: 신고 처리 상태 업데이트
export const useResolveReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useResolveReport"],
    mutationFn: async ({
      reportId,
      data,
    }: {
      reportId: string;
      data: ResolveReportRequest;
    }) => {
      const response = await adminApi.resolveReport(reportId, data);
      return response.data.data;
    },
    onSuccess: () => {
      // 신고 처리 후 신고 목록 무효화
      queryClient.invalidateQueries({ queryKey: adminKeys.reports() });
    },
  });
};
