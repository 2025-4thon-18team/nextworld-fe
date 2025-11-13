import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";


// 가짜 작품 데이터 생성
const createMockWork = (id: number) => ({
  id,
  title: `작품 제목 ${id}`,
  description: `작품 설명 ${id}입니다.`,
  coverImageUrl: `https://placehold.co/300x400?text=Work${id}`,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  universeDescription: `유니버스 설명 ${id}`,
  allowDerivative: id % 2 === 0,
  guidelineRelation: "관계 가이드라인",
  guidelineContent: "내용 가이드라인",
  guidelineBackground: "배경 가이드라인",
  bannedWords: ["금지어1", "금지어2"],
  isPaid: id % 3 === 0,
  price: id % 3 === 0 ? (id % 10 + 1) * 100 : 0,
  allowDerivativeProfit: id % 2 === 0,
  authorName: `작가${(id % 10) + 1}`,
});

// 가짜 포스트 데이터 생성
const createMockPost = (id: number) => ({
  id,
  title: `포스트 제목 ${id}`,
  content: `포스트 내용 ${id}입니다.`,
  authorName: `작가${(id % 10) + 1}`,
  workTitle: `작품 제목 ${Math.floor(id / 10) + 1}`,
  status: "PUBLISHED" as const,
  workType: "SHORT" as const,
  creationType: "ORIGINAL" as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const mypageHandlers = [
  // 내 작품 리스트 조회
  http.get(serverUrl("/api/mypage/works"), () => {
    const works = Array.from({ length: 10 }, (_, i) => createMockWork(i + 1));

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "내 작품 목록 조회 완료",
      data: works,
    });
  }),

  // 내 포스트 리스트 조회
  http.get(serverUrl("/api/mypage/posts"), () => {
    const posts = Array.from({ length: 10 }, (_, i) => createMockPost(i + 1));

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "내 포스트 목록 조회 완료",
      data: posts,
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

];
