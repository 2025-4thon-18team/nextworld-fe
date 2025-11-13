import { client } from "./client";

export interface DistributeRevenueRequest {
  workId: string;
  amount: number;
  recipients: {
    userId: string;
    share: number;
  }[];
}

export interface DistributeRevenueResponse {
  distributionId: string;
  totalAmount: number;
  distributions: {
    userId: string;
    amount: number;
  }[];
  createdAt: string;
}

export const revenueApi = {
  distributeRevenue: (data: DistributeRevenueRequest) =>
    client.post<{ data: DistributeRevenueResponse }>(
      "/api/revenue/distribute",
      data,
    ),
};
