import { http, HttpResponse } from "msw";

export const paymentHandlers = [
  // 포인트 충전
  http.post("/api/payment/charge", async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "포인트 충전에 성공했습니다.",
      data: null,
    });
  }),

  // 포인트 사용
  http.post("/api/payment/use", async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "포인트 사용이 완료되었습니다.",
      data: null,
    });
  }),

  // 결제 검증
  http.post("/api/payment/verify", async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "결제 검증 결과입니다.",
      data: true,
    });
  }),

  // 환불 요청
  http.post("/api/payment/refund", async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "환불 요청이 접수되었습니다. 관리자의 승인을 기다려주세요.",
      data: null,
    });
  }),

  // 충전 옵션 조회
  http.get("/api/payment/options", () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "충전 옵션 조회 성공",
      data: {
        currentPoints: 2000,
        chargeOptions: [
          { chargePoint: 1000, price: 1000, expectedBalance: 3000 },
          { chargePoint: 5000, price: 5000, expectedBalance: 7000 },
          { chargePoint: 10000, price: 10000, expectedBalance: 12000 },
        ],
        paymentMethods: ["카드", "계좌이체"],
      },
    });
  }),

  // 충전 내역 조회
  http.get("/api/payment/history/charge", () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "충전 내역 조회 성공",
      data: [
        {
          title: "포인트 충전",
          opponentName: null,
          amount: 100,
          date: "2025-10-23T00:00:00",
        },
        {
          title: "포인트 충전",
          opponentName: null,
          amount: 100,
          date: "2025-10-23T00:00:00",
        },
        {
          title: "포인트 충전",
          opponentName: null,
          amount: 100,
          date: "2025-10-23T00:00:00",
        },
      ],
    });
  }),

  // 사용 내역 조회
  http.get("/api/payment/history/use", () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "사용 내역 조회 성공",
      data: [
        {
          title: "포스트명",
          opponentName: "@naooung",
          amount: -100,
          date: "2025-10-23T00:00:00",
        },
        {
          title: "포스트명",
          opponentName: "@naooung",
          amount: -100,
          date: "2025-10-23T00:00:00",
        },
        {
          title: "포스트명",
          opponentName: "@naooung",
          amount: -100,
          date: "2025-10-23T00:00:00",
        },
      ],
    });
  }),
];
