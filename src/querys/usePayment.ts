import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./client";
import type {
  ChargeRequest,
  UseRequest,
  RefundRequest,
  VerifyRequest,
  ChargeOptionsResponse,
  PaymentHistoryResponse,
  PurchasedWorkResponse,
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

  // 구매한 포스트 리스트
  getPurchasedPosts: () =>
    client.get<PurchasedWorkResponse[]>("/api/payment/purchases/posts"),

  // 구매한 작품 리스트
  getPurchasedWorks: () =>
    client.get<PurchasedWorkResponse[]>("/api/payment/purchases/works"),

  // 구매한 모든 작품 리스트
  getAllPurchases: () =>
    client.get<PurchasedWorkResponse[]>("/api/payment/purchases/all"),
};

// ============================================
// Query Keys
// ============================================

export const paymentKeys = {
  all: ["payment"] as const,
  options: () => [...paymentKeys.all, "options"] as const,
  usageHistory: () => [...paymentKeys.all, "usageHistory"] as const,
  chargeHistory: () => [...paymentKeys.all, "chargeHistory"] as const,
  purchasedPosts: () => [...paymentKeys.all, "purchasedPosts"] as const,
  purchasedWorks: () => [...paymentKeys.all, "purchasedWorks"] as const,
  allPurchases: () => [...paymentKeys.all, "allPurchases"] as const,
};

// ============================================
// React Query Hooks
// ============================================

// 아임포트 타입 정의
interface IMPWindow {
  IMP?: {
    init: (code: string) => void;
    request_pay: (
      params: {
        pg?: string;
        pay_method: string;
        merchant_uid: string;
        name: string;
        amount: number;
        buyer_email?: string;
        buyer_name?: string;
        buyer_tel?: string;
      },
      callback: (rsp: {
        success: boolean;
        imp_uid: string;
        error_msg?: string;
      }) => void,
    ) => void;
  };
}

// 포인트 충전을 위한 아임포트 훅
export const useIamportPayment = () => {
  const { mutate: verifyPayment } = useVerifyPayment();
  const { mutate: chargePoints, isPending: isCharging } = useChargePoints();

  const requestPayment = useCallback(
    (
      params: {
        chargePoint: number;
        price: number;
        paymentMethod: string;
      },
      callbacks: {
        onSuccess?: () => void;
        onError?: (error: string) => void;
      },
    ) => {
      if (typeof window === "undefined") {
        callbacks.onError?.("결제를 시작할 수 없습니다.");
        return;
      }

      const impWindow = window as unknown as IMPWindow;
      if (!impWindow.IMP) {
        callbacks.onError?.("결제 시스템을 초기화할 수 없습니다.");
        return;
      }

      const IMP = impWindow.IMP;
      IMP.init("imp11835484"); // 아임포트 가맹점 식별코드

      // 결제 수단에 따라 pg 설정
      const pgMap: Record<string, string> = {
        네이버페이: "naverpay",
        카카오페이: "kakaopay",
        "카드 결제": "html5_inicis",
        "계좌 이체": "html5_inicis",
      };

      const merchantUid = `charge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      IMP.request_pay(
        {
          pg: pgMap[params.paymentMethod] || "html5_inicis",
          pay_method: "card",
          merchant_uid: merchantUid,
          name: `${params.chargePoint}P 충전`,
          amount: params.price,
        },
        (rsp) => {
          if (rsp.success) {
            // 1. charge API 호출 (Pay 엔티티 생성)
            chargePoints(
              {
                impUid: rsp.imp_uid,
                amount: params.price,
              },
              {
                onSuccess: () => {
                  // 2. charge 성공 후 verify API 호출 (imp_uid 검증 및 포인트 충전)
                  verifyPayment(
                    { impUid: rsp.imp_uid },
                    {
                      onSuccess: () => {
                        callbacks.onSuccess?.();
                      },
                      onError: (error: unknown) => {
                        const errorMessage =
                          (
                            error as {
                              response?: { data?: { message?: string } };
                            }
                          )?.response?.data?.message ||
                          "결제 검증에 실패했습니다.";
                        callbacks.onError?.(errorMessage);
                      },
                    },
                  );
                },
                onError: (error: unknown) => {
                  const errorMessage =
                    (
                      error as {
                        response?: { data?: { message?: string } };
                      }
                    )?.response?.data?.message || "포인트 충전에 실패했습니다.";
                  callbacks.onError?.(errorMessage);
                },
              },
            );
          } else {
            callbacks.onError?.(rsp.error_msg || "결제에 실패했습니다.");
          }
        },
      );
    },
    [verifyPayment, chargePoints],
  );

  return {
    requestPayment,
    isCharging,
  };
};
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

// Query: 구매한 포스트 리스트
export const useGetPurchasedPosts = () => {
  return useQuery({
    queryKey: ["useGetPurchasedPosts", ...paymentKeys.purchasedPosts()],
    queryFn: async () => {
      const response = await paymentApi.getPurchasedPosts();
      return response.data;
    },
  });
};

// Query: 구매한 작품 리스트
export const useGetPurchasedWorks = () => {
  return useQuery({
    queryKey: ["useGetPurchasedWorks", ...paymentKeys.purchasedWorks()],
    queryFn: async () => {
      const response = await paymentApi.getPurchasedWorks();
      return response.data;
    },
  });
};

// Query: 구매한 모든 작품 리스트
export const useGetAllPurchases = () => {
  return useQuery({
    queryKey: ["useGetAllPurchases", ...paymentKeys.allPurchases()],
    queryFn: async () => {
      const response = await paymentApi.getAllPurchases();
      return response.data;
    },
  });
};
