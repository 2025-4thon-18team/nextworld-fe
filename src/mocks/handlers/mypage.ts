import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

export const mypageHandlers = [
  // 내 포인트 조회
  http.get(serverUrl("/api/mypage/points"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "포인트 조회가 완료되었습니다.",
      data: {
        balance: 2000,
      },
    });
  }),

  // 포인트 결제 내역 조회
  http.get(serverUrl("/api/mypage/paylist"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "결제 내역 조회가 완료되었습니다.",
      data: [
        {
          payId: 1,
          amount: 1000,
          type: "CHARGE",
          status: "COMPLETED",
          impUid: "imp_1234567890",
          createdAt: "2025-10-23T00:00:00",
        },
        {
          payId: 2,
          amount: 500,
          type: "USE",
          status: "COMPLETED",
          impUid: "imp_0987654321",
          createdAt: "2025-10-22T00:00:00",
        },
      ],
    });
  }),
];
