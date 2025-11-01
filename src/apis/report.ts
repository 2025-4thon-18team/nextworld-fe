import { client } from "./client";

export interface ReportWorkRequest {
  reason: string;
  description?: string;
  category:
    | "spam"
    | "harassment"
    | "inappropriate"
    | "copyright"
    | "violence"
    | "other";
}

export interface ReportWorkResponse {
  reportId: string;
  workId: string;
  reporterId: string;
  reason: string;
  description?: string;
  category: string;
  status: "pending" | "reviewing" | "resolved" | "rejected";
  createdAt: string;
}

export const reportApi = {
  reportWork: (workId: string, data: ReportWorkRequest) =>
    client.post<{ data: ReportWorkResponse }>(
      `/api/report/work/${workId}`,
      data,
    ),
};
