import { http, HttpResponse } from "msw";

export const reportHandlers = [
  // 작품 신고
  http.post("/api/report/work/:work_id", async ({ request, params }) => {
    const { work_id } = params;
    const body = await request.json();
    const { reason, description, category } = body as {
      reason: string;
      description?: string;
      category: string;
    };

    return HttpResponse.json(
      {
        data: {
          reportId: "report-" + Date.now(),
          workId: work_id,
          reporterId: "user-1",
          reason,
          description,
          category,
          status: "pending" as const,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    );
  }),
];
