import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 작품 데이터 생성
const createMockWork = (id: number) => ({
  id,
  title: `작품 제목 ${id}`,
  description: `작품 설명 ${id}입니다. 이것은 멋진 이야기입니다...`,
  coverImageUrl: `https://placehold.co/300x400?text=Work${id}`,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  universeDescription: `유니버스 설명 ${id}`,
  allowDerivative: id % 2 === 0,
  guidelineRelation: "관계 가이드라인",
  guidelineContent: "내용 가이드라인",
  guidelineBackground: "배경 가이드라인",
  bannedWords: ["금지어1", "금지어2"],
  isPaid: id % 3 === 0,
  price: id % 3 === 0 ? ((id % 10) + 1) * 100 : 0,
  allowDerivativeProfit: id % 2 === 0,
  authorName: `작가${(id % 10) + 1}`,
});

// 가짜 포스트 데이터 생성 함수
const createMockPost = (id: number) => ({
  id,
  title: `포스트 제목 ${id}`,
  content: `포스트 내용 ${id}입니다. 이것은 멋진 이야기입니다...`,
  authorName: `작가${(id % 10) + 1}`,
  workTitle: `작품 제목 ${Math.floor(id / 10) + 1}`,
  status: "PUBLISHED" as const,
  workType: (id % 2 === 0 ? "SHORT" : "SERIALIZED") as "SHORT" | "SERIALIZED",
  creationType: (id % 3 === 0 ? "DERIVATIVE" : "ORIGINAL") as
    | "ORIGINAL"
    | "DERIVATIVE",
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  updatedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
});

export const feedHandlers = [
  // 최근 피드 조회 (인증 불필요)
  http.get(serverUrl("/api/feed/recent"), () => {
    const works = Array.from({ length: 20 }, (_, i) => createMockWork(i + 1));
    const posts = Array.from({ length: 20 }, (_, i) => createMockPost(i + 1));

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "최근 피드를 조회했습니다.",
      data: {
        works,
        posts,
      },
    });
  }),

  // 작품/포스트 통합 검색 (인증 불필요, keyword 쿼리 파라미터 필수)
  http.get(serverUrl("/api/search"), ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("keyword") || "";

    let works = Array.from({ length: 30 }, (_, i) => createMockWork(i + 1));
    let posts = Array.from({ length: 30 }, (_, i) => createMockPost(i + 1));

    // 검색어로 필터링
    if (keyword) {
      works = works.filter(
        (work) =>
          work.title.includes(keyword) ||
          work.description.includes(keyword) ||
          work.authorName.includes(keyword),
      );
      posts = posts.filter(
        (post) =>
          post.title.includes(keyword) ||
          post.content.includes(keyword) ||
          post.authorName.includes(keyword),
      );
    }

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "검색이 완료되었습니다.",
      data: {
        works,
        posts,
      },
    });
  }),
];
