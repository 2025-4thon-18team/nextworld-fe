import { http, HttpResponse } from "msw";

export const revenueHandlers = [
  // 수익 분배
  http.post("/api/revenue/distribute", async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "수익 분배가 완료되었습니다.",
      data: null,
    });
  }),

  // 수익 대시보드 조회
  http.get("/api/revenue/dashboard", () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "대시보드 조회 성공",
      data: {
        totalSalesCount: 213,
        totalRevenue: 100000,
        originalAuthorFee: 20000,
        platformFee: 10000,
        netIncome: 70000,
      },
    });
  }),

  // 판매 내역 조회
  http.get("/api/revenue/sales", () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "매출 내역 조회 성공",
      data: [
        {
          postTitle: "창작물명 창작물명 창작물명 창작물명",
          buyerNickname: "naooung",
          amount: 100,
          date: "2025-10-23T00:00:00",
        },
        {
          postTitle: "창작물명 창작물명 창작물명 창작물명",
          buyerNickname: "naooung",
          amount: 100,
          date: "2025-10-23T00:00:00",
        },
      ],
    });
  }),

  // 수익 정산
  http.post("/api/revenue/settle", () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "정산이 완료되었습니다.",
      data: {
        totalSettledAmount: 50000,
        remainingUnsettled: 20000,
        newPointsBalance: 70000,
      },
    });
  }),

  // 정산 내역 조회
  http.get("/api/revenue/settle/history", () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "정산 내역 조회 성공",
      data: [
        {
          settledAmount: 50000,
          previousBalance: 0,
          newBalance: 50000,
          settledAt: "2025-10-23T00:00:00",
        },
      ],
    });
  }),
];
