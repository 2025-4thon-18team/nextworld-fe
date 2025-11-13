import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 사용자 데이터 생성
const createMockUser = (id: number) => ({
  userId: `user-${id}`,
  email: `user${id}@example.com`,
  nickname: `사용자${id}`,
  profileImage: `https://via.placeholder.com/50?text=User${id}`,
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
  // 전체 유저 목록 조회
  http.get(serverUrl("/api/admin/users"), ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    let users = Array.from({ length: 100 }, (_, i) => createMockUser(i + 1));

    // 필터링
    if (status) {
      users = users.filter((user) => user.status === status);
    }

    if (search) {
      users = users.filter(
        (user) => user.nickname.includes(search) || user.email.includes(search),
      );
    }

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pageUsers = users.slice(startIdx, endIdx);

    return HttpResponse.json({
      data: {
        users: pageUsers,
        totalCount: users.length,
        page,
        pageSize,
      },
    });
  }),

  // 결제/환불 요청 조회
  http.get(serverUrl("/api/admin/payments"), ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");
    const type = url.searchParams.get("type");
    const status = url.searchParams.get("status");

    let payments = Array.from({ length: 200 }, (_, i) =>
      createMockPayment(i + 1),
    );

    // 필터링
    if (type) {
      payments = payments.filter((payment) => payment.type === type);
    }

    if (status) {
      payments = payments.filter((payment) => payment.status === status);
    }

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pagePayments = payments.slice(startIdx, endIdx);

    return HttpResponse.json({
      data: {
        payments: pagePayments,
        totalCount: payments.length,
        page,
        pageSize,
      },
    });
  }),

  // 특정 결제건 환불 처리
  http.patch(
    serverUrl("/api/admin/payments/:tx_id/refund"),
    async ({ params }) => {
      const { tx_id } = params;

      return HttpResponse.json({
        data: {
          transactionId: tx_id,
          refundAmount: 50000,
          status: "refunded",
          refundedAt: new Date().toISOString(),
        },
      });
    },
  ),

  // 신고 목록 조회
  http.get(serverUrl("/api/admin/reports"), ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");
    const status = url.searchParams.get("status");
    const category = url.searchParams.get("category");

    let reports = Array.from({ length: 150 }, (_, i) =>
      createMockReport(i + 1),
    );

    // 필터링
    if (status) {
      reports = reports.filter((report) => report.status === status);
    }

    if (category) {
      reports = reports.filter((report) => report.category === category);
    }

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pageReports = reports.slice(startIdx, endIdx);

    return HttpResponse.json({
      data: {
        reports: pageReports,
        totalCount: reports.length,
        page,
        pageSize,
      },
    });
  }),

  // 신고 처리 상태 업데이트
  http.patch(
    "/api/admin/reports/:report_id/resolve",
    async ({ request, params }) => {
      const { report_id } = params;
      const body = await request.json();
      const { status, resolution } = body as {
        status: string;
        resolution?: string;
      };

      return HttpResponse.json({
        data: {
          reportId: report_id,
          status,
          resolution,
          resolvedAt: new Date().toISOString(),
          resolvedBy: "admin-1",
        },
      });
    },
  ),
];
