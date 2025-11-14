import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 작품 데이터 생성 함수
const createMockWork = (id: number) => ({
  id,
  workType: id % 3 === 0 ? "DERIVATIVE" : "ORIGINAL",
  title: `작품 제목 ${id}`,
  description: `작품 설명 ${id}입니다. 이것은 멋진 이야기입니다...`,
  coverImageUrl: `https://placehold.co/300x400?text=Work${id}`,
  category: `카테고리${(id % 5) + 1}`,
  serializationSchedule: id % 2 === 0 ? "매주 월요일" : "완결",
  allowDerivative: id % 2 === 0,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  totalLikesCount: Math.floor(Math.random() * 1000),
  totalViewsCount: Math.floor(Math.random() * 10000),
  totalRating: Number((Math.random() * 5).toFixed(1)),
  authorName: `작가${(id % 10) + 1}`,
  parentWorkId: id % 3 === 0 ? Math.floor(id / 3) : null,
  parentWorkTitle: id % 3 === 0 ? `원작 작품 ${Math.floor(id / 3)}` : null,
});

export const worksHandlers = [
  // 작품 생성 (BaseResponse 없이 직접 반환)
  http.post(serverUrl("/api/works"), async ({ request }) => {
    const body = await request.json();
    const workId = Math.floor(Math.random() * 10000) + 1;

    const work = {
      ...createMockWork(workId),
      ...(body as object),
      id: workId,
    };

    return HttpResponse.json(work);
  }),

  // 작품 목록 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/works"), ({ request }) => {
    const url = new URL(request.url);
    const workType = url.searchParams.get("workType");

    const works = Array.from({ length: 20 }, (_, i) => createMockWork(i + 1));

    // workType 필터링
    const filteredWorks = workType
      ? works.filter((work) => work.workType === workType)
      : works;

    return HttpResponse.json(filteredWorks);
  }),

  // 작품 상세 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/works/:id"), ({ params }) => {
    const { id } = params;
    const workId = parseInt(id as string);
    const work = createMockWork(workId);

    return HttpResponse.json(work);
  }),

  // 작품 회차 목록 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/works/:workId/posts"), ({ params }) => {
    const { workId } = params;
    const posts = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `회차 ${i + 1} 제목`,
      content: `회차 ${i + 1} 내용입니다.`,
      hasImage: i % 2 === 0,
      workId: parseInt(workId as string),
      workTitle: `작품 제목 ${workId}`,
      postType: "EPISODE" as const,
      episodeNumber: i + 1,
      parentWorkId: null,
      parentWorkTitle: null,
      authorName: `작가${(i % 10) + 1}`,
      creationType: "ORIGINAL" as const,
      isPaid: i % 3 === 0,
      price: i % 3 === 0 ? (i + 1) * 100 : null,
      tags: [`태그${i % 5}`],
      viewsCount: Math.floor(Math.random() * 1000),
      commentsCount: Math.floor(Math.random() * 100),
      rating: Number((Math.random() * 5).toFixed(1)),
      status: "PUBLISHED" as const,
      aiCheck: "PASS",
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    }));

    return HttpResponse.json(posts);
  }),

  // 2차 창작 포스트 목록 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/works/:workId/derivatives"), ({ params }) => {
    const { workId } = params;
    const posts = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `2차 창작 포스트 ${i + 1} 제목`,
      content: `2차 창작 포스트 ${i + 1} 내용입니다.`,
      hasImage: i % 2 === 0,
      workId: null,
      workTitle: null,
      postType: "POST" as const,
      episodeNumber: null,
      parentWorkId: parseInt(workId as string),
      parentWorkTitle: `원작 작품 ${workId}`,
      authorName: `작가${(i % 10) + 1}`,
      creationType: "DERIVATIVE" as const,
      isPaid: false,
      price: null,
      tags: [`태그${i % 5}`],
      viewsCount: Math.floor(Math.random() * 1000),
      commentsCount: Math.floor(Math.random() * 100),
      rating: Number((Math.random() * 5).toFixed(1)),
      status: "PUBLISHED" as const,
      aiCheck: "PASS",
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    }));

    return HttpResponse.json(posts);
  }),

  // 작품 가이드라인 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/works/:workId/guideline"), ({ params }) => {
    const { workId } = params;
    const guideline = {
      workId: parseInt(workId as string),
      workTitle: `작품 제목 ${workId}`,
      guidelineRelation: "관계 가이드라인",
      guidelineContent: "내용 가이드라인",
      guidelineBackground: "배경 가이드라인",
      bannedWords: "금지어1, 금지어2",
    };

    return HttpResponse.json(guideline);
  }),

  // 작품 이미지 업로드 (BaseResponse 없이 직접 반환)
  http.post(serverUrl("/api/works/upload-image"), async () => {
    const imageUrl = `https://placehold.co/300x400?text=Uploaded${Date.now()}`;
    return HttpResponse.json(imageUrl);
  }),

  // 작품 삭제 (BaseResponse 없이 직접 반환)
  http.delete(serverUrl("/api/works/:id"), ({ params }) => {
    const { id } = params;
    return HttpResponse.text(`작품이 성공적으로 삭제되었습니다. ID: ${id}`);
  }),
];
