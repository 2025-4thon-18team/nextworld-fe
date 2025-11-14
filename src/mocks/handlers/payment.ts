import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

export const paymentHandlers = [
  // 포인트 충전
  http.post(serverUrl("/api/payment/charge"), async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "포인트 충전에 성공했습니다.",
      data: null,
    });
  }),

  // 포인트 사용
  http.post(serverUrl("/api/payment/use"), async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "포인트 사용이 완료되었습니다.",
      data: null,
    });
  }),

  // 결제 검증
  http.post(serverUrl("/api/payment/verify"), async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "결제 검증 결과입니다.",
      data: true,
    });
  }),

  // 환불 요청
  http.post(serverUrl("/api/payment/refund"), async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "환불 요청이 접수되었습니다. 관리자의 승인을 기다려주세요.",
      data: null,
    });
  }),

  // 충전 옵션 조회
  http.get(serverUrl("/api/payment/options"), () => {
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
  http.get(serverUrl("/api/payment/history/charge"), () => {
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
  http.get(serverUrl("/api/payment/history/use"), () => {
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

  // 구매한 포스트 리스트 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/payment/purchases/posts"), () => {
    const purchases = Array.from({ length: 10 }, (_, i) => ({
      postId: i + 1,
      workId: Math.floor(i / 3) + 1,
      title: `구매한 포스트 ${i + 1}`,
      amount: (i + 1) * 100,
      purchasedAt: new Date(Date.now() - i * 86400000).toISOString(),
      coverImageUrl: `https://placehold.co/300x400?text=Post${i + 1}`,
      workType: i % 2 === 0 ? "ORIGINAL" : "DERIVATIVE",
      parentWorkId: i % 2 === 0 ? null : Math.floor(i / 2),
    }));

    return HttpResponse.json(purchases);
  }),

  // 구매한 작품 리스트 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/payment/purchases/works"), () => {
    const purchases = Array.from({ length: 10 }, (_, i) => ({
      postId: i + 1,
      workId: i + 1,
      title: `구매한 작품 ${i + 1}`,
      amount: (i + 1) * 500,
      purchasedAt: new Date(Date.now() - i * 86400000).toISOString(),
      coverImageUrl: `https://placehold.co/300x400?text=Work${i + 1}`,
      workType: i % 2 === 0 ? "ORIGINAL" : "DERIVATIVE",
      parentWorkId: i % 2 === 0 ? null : Math.floor(i / 2),
    }));

    return HttpResponse.json(purchases);
  }),

  // 구매한 모든 작품 리스트 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/payment/purchases/all"), () => {
    const purchases = Array.from({ length: 20 }, (_, i) => ({
      postId: i + 1,
      workId: Math.floor(i / 2) + 1,
      title: `구매한 작품 ${i + 1}`,
      amount: (i + 1) * 100,
      purchasedAt: new Date(Date.now() - i * 86400000).toISOString(),
      coverImageUrl: `https://placehold.co/300x400?text=Purchase${i + 1}`,
      workType: i % 2 === 0 ? "ORIGINAL" : "DERIVATIVE",
      parentWorkId: i % 2 === 0 ? null : Math.floor(i / 2),
    }));

    return HttpResponse.json(purchases);
  }),
];
