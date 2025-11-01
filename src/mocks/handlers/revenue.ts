import { http, HttpResponse } from "msw";

export const revenueHandlers = [
  // 수익 분배
  http.post("/api/revenue/distribute", async ({ request }) => {
    const body = await request.json();
    const { workId, amount, recipients } = body as {
      workId: string;
      amount: number;
      recipients: { userId: string; share: number }[];
    };

    const distributions = recipients.map((recipient) => ({
      userId: recipient.userId,
      amount: Math.floor(amount * recipient.share),
    }));

    return HttpResponse.json({
      data: {
        distributionId: "dist-" + Date.now(),
        totalAmount: amount,
        distributions,
        createdAt: new Date().toISOString(),
      },
    });
  }),
];
