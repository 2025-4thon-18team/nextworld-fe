import { http, HttpResponse } from "msw";

// 가짜 작품 데이터 생성
const createMockWork = (id: number, type: "original" | "derivative") => ({
  workId: `work-${id}`,
  title: `${type === "original" ? "1차" : "2차"} 작품 제목 ${id}`,
  content: `이것은 ${type === "original" ? "1차" : "2차"} 작품의 내용입니다...`,
  type,
  authorId: "user-1",
  authorName: "테스트유저",
  likesCount: Math.floor(Math.random() * 1000),
  commentsCount: Math.floor(Math.random() * 100),
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  thumbnailUrl: `https://via.placeholder.com/300x200?text=Work${id}`,
});

export const mypageHandlers = [
  // 내 작품 리스트 조회
  http.get("/api/mypage/works", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

    const totalWorks = Array.from({ length: 25 }, (_, i) =>
      createMockWork(i + 1, i % 3 === 0 ? "derivative" : "original"),
    );

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const works = totalWorks.slice(startIdx, endIdx);

    return HttpResponse.json({
      data: {
        works,
        totalCount: totalWorks.length,
        page,
        pageSize,
      },
    });
  }),

  // 내 북마크 작품 리스트 조회
  http.get("/api/mypage/bookmarks", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

    const totalBookmarks = Array.from({ length: 15 }, (_, i) =>
      createMockWork(i + 100, "original"),
    );

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const works = totalBookmarks.slice(startIdx, endIdx);

    return HttpResponse.json({
      data: {
        works,
        totalCount: totalBookmarks.length,
        page,
        pageSize,
      },
    });
  }),

  // 내 포인트
  http.get("/api/mypage/points", () => {
    return HttpResponse.json({
      data: {
        totalPoints: 50000,
        availablePoints: 45000,
        lockedPoints: 5000,
      },
    });
  }),

  // 포인트 결제 내역
  http.get("/api/mypage/paylist", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

    const payments = Array.from({ length: 20 }, (_, i) => ({
      transactionId: `tx-${i + 1}`,
      type: i % 3 === 0 ? "charge" : i % 3 === 1 ? "use" : "refund",
      amount: (i + 1) * 1000,
      status: "completed",
      createdAt: new Date(
        Date.now() - i * 86400000,
      ).toISOString() as unknown as string,
      description: `결제 내역 ${i + 1}`,
    }));

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

  // 내 수익
  http.get("/api/mypage/revenue", () => {
    return HttpResponse.json({
      data: {
        totalRevenue: 150000,
        availableRevenue: 120000,
        pendingRevenue: 30000,
        revenueHistory: Array.from({ length: 10 }, (_, i) => ({
          date: new Date(Date.now() - i * 86400000).toISOString(),
          amount: (i + 1) * 5000,
          source: `작품-${i + 1}`,
        })),
      },
    });
  }),
];
