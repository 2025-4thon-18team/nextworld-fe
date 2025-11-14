import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

export const adminHandlers = [
  // 환불 요청 목록 조회
  http.get(serverUrl("/api/admin/payments"), () => {
    // 환불 요청 상태인 결제만 필터링
    const refundRequests = Array.from({ length: 10 }, (_, i) => ({
      payId: i + 1,
      amount: ((i % 10) + 1) * 10000,
      type: "REFUND" as const,
      status: "REFUND_REQUESTED" as const,
      impUid: `imp_refund_${i + 1}`,
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    }));

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "환불 요청 목록 조회 완료",
      data: refundRequests,
    });
  }),

  // 환불 승인
  http.patch(
    serverUrl("/api/admin/payments/:payId/refund"),
    ({ params: _params }) => {
      return HttpResponse.json({
        success: true,
        code: 200,
        message: "환불이 성공적으로 처리되었습니다.",
        data: null,
      });
    },
  ),
];
