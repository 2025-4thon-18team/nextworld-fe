import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

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
  thumbnailUrl: `https://placehold.co/300x200?text=Work${id}`,
});

export const mypageHandlers = [
  // 내 작품 리스트 조회
  http.get(serverUrl("/api/mypage/works"), ({ request }) => {
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
  http.get(serverUrl("/api/mypage/bookmarks"), ({ request }) => {
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

  // 포인트 결제 내역
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

  // 내 수익
  http.get(serverUrl("/api/mypage/revenue"), () => {
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
