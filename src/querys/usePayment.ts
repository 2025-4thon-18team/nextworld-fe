import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  paymentApi,
  ChargePointsRequest,
  UsePointsRequest,
} from "../apis/payment";
import { mypageKeys } from "./useMypage";

// Mutation: 포인트 충전
export const useChargePoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useChargePoints"],
    mutationFn: async (data: ChargePointsRequest) => {
      const response = await paymentApi.chargePoints(data);
      return response.data.data;
    },
    onSuccess: () => {
      // 포인트 충전 후 포인트 및 결제 내역 무효화
      queryClient.invalidateQueries({ queryKey: mypageKeys.points() });
      queryClient.invalidateQueries({ queryKey: mypageKeys.paylist() });
    },
  });
};

// Mutation: 포인트 사용
export const useUsePoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUsePoints"],
    mutationFn: async (data: UsePointsRequest) => {
      const response = await paymentApi.usePoints(data);
      return response.data.data;
    },
    onSuccess: () => {
      // 포인트 사용 후 포인트 및 결제 내역 무효화
      queryClient.invalidateQueries({ queryKey: mypageKeys.points() });
      queryClient.invalidateQueries({ queryKey: mypageKeys.paylist() });
    },
  });
};
