import { client } from "./client";

export interface ChargePointsRequest {
  amount: number;
  paymentMethod: string;
}

export interface ChargePointsResponse {
  transactionId: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface UsePointsRequest {
  workId: string;
  amount: number;
  purpose: string;
}

export interface UsePointsResponse {
  transactionId: string;
  amount: number;
  remainingPoints: number;
  createdAt: string;
}

export const paymentApi = {
  chargePoints: (data: ChargePointsRequest) =>
    client.post<{ data: ChargePointsResponse }>("/api/payment/charge", data),

  usePoints: (data: UsePointsRequest) =>
    client.post<{ data: UsePointsResponse }>("/api/payment/use", data),
};
