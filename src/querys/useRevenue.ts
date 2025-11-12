import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type {
  DistributeRequest,
  RevenueDashboardResponse,
  RevenueSaleItemResponse,
  RevenueSettleHistoryResponse,
  RevenueSettleResponse,
} from "./types";

// ============================================
// API 함수
// ============================================

export const revenueApi = {
  // 수익 정산 (백엔드에서 파라미터 없이 호출)
  settle: () => client.post<RevenueSettleResponse>("/api/revenue/settle"),

  // 수익 분배 (백엔드에서 빈 응답)
  distribute: (data: DistributeRequest) =>
    client.post<void>("/api/revenue/distribute", data),

  // 정산 내역 조회
  getSettleHistory: () =>
    client.get<RevenueSettleHistoryResponse[]>("/api/revenue/settle/history"),

  // 판매 내역 조회
  getSales: () =>
    client.get<RevenueSaleItemResponse[]>("/api/revenue/sales"),

  // 수익 대시보드 조회
  getDashboard: () =>
    client.get<RevenueDashboardResponse>("/api/revenue/dashboard"),
};

// ============================================
// Query Keys
// ============================================

export const revenueKeys = {
  all: ["revenue"] as const,
  dashboard: () => [...revenueKeys.all, "dashboard"] as const,
  sales: () => [...revenueKeys.all, "sales"] as const,
  settleHistory: () => [...revenueKeys.all, "settleHistory"] as const,
};

// ============================================
// React Query Hooks
// ============================================

// Mutation: 수익 정산
export const useSettleRevenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useSettleRevenue"],
    mutationFn: async () => {
      const response = await revenueApi.settle();
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: revenueKeys.dashboard() });
      queryClient.invalidateQueries({ queryKey: revenueKeys.settleHistory() });
    },
  });
};

// Mutation: 수익 분배
export const useDistributeRevenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDistributeRevenue"],
    mutationFn: async (data: DistributeRequest) => {
      await revenueApi.distribute(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: revenueKeys.dashboard() });
      queryClient.invalidateQueries({ queryKey: revenueKeys.sales() });
    },
  });
};

// Query: 정산 내역 조회
export const useGetSettleHistory = () => {
  return useQuery({
    queryKey: ["useGetSettleHistory", ...revenueKeys.settleHistory()],
    queryFn: async () => {
      const response = await revenueApi.getSettleHistory();
      return response.data;
    },
  });
};

// Query: 판매 내역 조회
export const useGetSales = () => {
  return useQuery({
    queryKey: ["useGetSales", ...revenueKeys.sales()],
    queryFn: async () => {
      const response = await revenueApi.getSales();
      return response.data;
    },
  });
};

// Query: 수익 대시보드 조회
export const useGetRevenueDashboard = () => {
  return useQuery({
    queryKey: ["useGetRevenueDashboard", ...revenueKeys.dashboard()],
    queryFn: async () => {
      const response = await revenueApi.getDashboard();
      return response.data;
    },
  });
};
