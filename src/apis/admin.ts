import { client } from "./client";

export interface User {
  userId: string;
  email: string;
  nickname: string;
  profileImage?: string;
  role: "user" | "admin";
  status: "active" | "suspended" | "deleted";
  createdAt: string;
  lastLoginAt?: string;
}

export interface UsersResponse {
  users: User[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface Payment {
  transactionId: string;
  userId: string;
  userName: string;
  type: "charge" | "use" | "refund";
  amount: number;
  status: "pending" | "completed" | "failed" | "refund_requested";
  paymentMethod?: string;
  createdAt: string;
  completedAt?: string;
}

export interface PaymentsResponse {
  payments: Payment[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface RefundRequest {
  reason?: string;
}

export interface RefundResponse {
  transactionId: string;
  refundAmount: number;
  status: string;
  refundedAt: string;
}

export interface Report {
  reportId: string;
  workId: string;
  workTitle?: string;
  reporterId: string;
  reporterName: string;
  targetUserId: string;
  targetUserName: string;
  reason: string;
  description?: string;
  category: string;
  status: "pending" | "reviewing" | "resolved" | "rejected";
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface ReportsResponse {
  reports: Report[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ResolveReportRequest {
  status: "resolved" | "rejected";
  resolution?: string;
  action?: "none" | "warning" | "suspend" | "delete";
}

export interface ResolveReportResponse {
  reportId: string;
  status: string;
  resolution?: string;
  resolvedAt: string;
  resolvedBy: string;
}

export const adminApi = {
  getUsers: (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    search?: string;
  }) => client.get<{ data: UsersResponse }>("/api/admin/users", { params }),

  getPayments: (params?: {
    page?: number;
    pageSize?: number;
    type?: string;
    status?: string;
  }) =>
    client.get<{ data: PaymentsResponse }>("/api/admin/payments", { params }),

  refundPayment: (txId: string, data?: RefundRequest) =>
    client.patch<{ data: RefundResponse }>(
      `/api/admin/payments/${txId}/refund`,
      data,
    ),

  getReports: (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    category?: string;
  }) => client.get<{ data: ReportsResponse }>("/api/admin/reports", { params }),

  resolveReport: (reportId: string, data: ResolveReportRequest) =>
    client.patch<{ data: ResolveReportResponse }>(
      `/api/admin/reports/${reportId}/resolve`,
      data,
    ),
};
