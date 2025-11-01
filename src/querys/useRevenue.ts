import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revenueApi, DistributeRevenueRequest } from "../apis/revenue";
import { mypageKeys } from "./useMypage";

// Mutation: 수익 분배
export const useDistributeRevenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDistributeRevenue"],
    mutationFn: async (data: DistributeRevenueRequest) => {
      const response = await revenueApi.distributeRevenue(data);
      return response.data.data;
    },
    onSuccess: () => {
      // 수익 분배 후 수익 정보 무효화
      queryClient.invalidateQueries({ queryKey: mypageKeys.revenue() });
    },
  });
};
