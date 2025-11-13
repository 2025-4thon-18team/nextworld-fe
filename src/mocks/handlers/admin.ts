import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 사용자 데이터 생성
const createMockUser = (id: number) => ({
  userId: `user-${id}`,
  email: `user${id}@example.com`,
  nickname: `사용자${id}`,
  profileImage: `https://placehold.co/50?text=User${id}`,
  role: id === 1 ? ("admin" as const) : ("user" as const),
  status: id % 10 === 0 ? ("suspended" as const) : ("active" as const),
  createdAt: new Date(Date.now() - Math.random() * 100000000000).toISOString(),
  lastLoginAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
});

// 가짜 결제 데이터 생성
const createMockPayment = (id: number) => ({
  transactionId: `tx-${id}`,
  userId: `user-${(id % 50) + 1}`,
  userName: `사용자${(id % 50) + 1}`,
  type:
    id % 4 === 0
      ? ("refund" as const)
      : id % 3 === 0
        ? ("use" as const)
        : ("charge" as const),
  amount: ((id % 10) + 1) * 10000,
  status:
    id % 20 === 0
      ? ("refund_requested" as const)
      : id % 15 === 0
        ? ("pending" as const)
        : ("completed" as const),
  paymentMethod: id % 2 === 0 ? "card" : "bank_transfer",
  createdAt: new Date(Date.now() - id * 3600000).toISOString(),
  completedAt:
    id % 15 !== 0
      ? new Date(Date.now() - id * 3600000 + 600000).toISOString()
      : undefined,
});

// 가짜 신고 데이터 생성
const createMockReport = (id: number) => ({
  reportId: `report-${id}`,
  workId: `work-${(id % 100) + 1}`,
  workTitle: `작품 제목 ${(id % 100) + 1}`,
  reporterId: `user-${(id % 50) + 1}`,
  reporterName: `사용자${(id % 50) + 1}`,
  targetUserId: `user-${(((id % 50) + 26) % 50) + 1}`,
  targetUserName: `사용자${(((id % 50) + 26) % 50) + 1}`,
  reason: "부적절한 내용",
  description: `신고 사유 상세 설명 ${id}`,
  category:
    id % 5 === 0
      ? "spam"
      : id % 5 === 1
        ? "harassment"
        : id % 5 === 2
          ? "inappropriate"
          : id % 5 === 3
            ? "copyright"
            : "violence",
  status:
    id % 4 === 0
      ? ("resolved" as const)
      : id % 4 === 1
        ? ("rejected" as const)
        : id % 4 === 2
          ? ("reviewing" as const)
          : ("pending" as const),
  createdAt: new Date(Date.now() - id * 3600000).toISOString(),
  resolvedAt:
    id % 4 === 0 || id % 4 === 1
      ? new Date(Date.now() - id * 3600000 + 7200000).toISOString()
      : undefined,
  resolvedBy: id % 4 === 0 || id % 4 === 1 ? "admin-1" : undefined,
});

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
  http.patch(serverUrl("/api/admin/payments/:payId/refund"), ({ params }) => {
    const { payId } = params;

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "환불이 성공적으로 처리되었습니다.",
      data: null,
    });
  }),
];
