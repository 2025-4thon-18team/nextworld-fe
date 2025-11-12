import { http, HttpResponse } from "msw";

export const paymentHandlers = [
  // 포인트 충전
  http.post("/api/payment/charge", async ({ request }) => {
    const body = await request.json();
    const { amount } = body as { amount: number };

    return HttpResponse.json({
      data: {
        transactionId: "tx-charge-" + Date.now(),
        amount,
        status: "completed",
        createdAt: new Date().toISOString(),
      },
    });
  }),

  // 포인트 사용
  http.post("/api/payment/use", async ({ request }) => {
    const body = await request.json();
    const { amount } = body as { amount: number };

    return HttpResponse.json({
      data: {
        transactionId: "tx-use-" + Date.now(),
        amount,
        remainingPoints: 45000 - amount,
        createdAt: new Date().toISOString(),
      },
    });
  }),
];
