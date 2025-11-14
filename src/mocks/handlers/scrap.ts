import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 스크랩된 작품 ID 목록 (시뮬레이션용)
const scrappedWorkIds = [1, 3, 5, 7, 9, 12, 15, 18, 21, 24];

// 가짜 작품 데이터 생성 함수 (WorkResponseDto 구조)
const createMockWork = (id: number) => ({
  id,
  workType: id % 3 === 0 ? "DERIVATIVE" : "ORIGINAL",
  title: `작품 제목 ${id}`,
  description: `작품 설명 ${id}입니다.`,
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

// 가짜 포스트 데이터 생성 함수 (PostResponseDto 구조)
const createMockPost = (id: number) => ({
  id,
  title: `포스트 제목 ${id}`,
  content: `포스트 내용 ${id}입니다.`,
  hasImage: id % 2 === 0,
  workId: id % 3 === 0 ? null : Math.floor(id / 10) + 1,
  workTitle: id % 3 === 0 ? null : `작품 제목 ${Math.floor(id / 10) + 1}`,
  postType: id % 3 === 0 ? "POST" : "EPISODE",
  episodeNumber: id % 3 === 0 ? null : (id % 10) + 1,
  parentWorkId: id % 5 === 0 ? Math.floor(id / 5) : null,
  parentWorkTitle: id % 5 === 0 ? `원작 작품 ${Math.floor(id / 5)}` : null,
  authorName: `작가${(id % 10) + 1}`,
  creationType: id % 3 === 0 ? "DERIVATIVE" : "ORIGINAL",
  isPaid: id % 3 === 0,
  price: id % 3 === 0 ? ((id % 10) + 1) * 100 : null,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  viewsCount: Math.floor(Math.random() * 1000),
  commentsCount: Math.floor(Math.random() * 100),
  rating: Number((Math.random() * 5).toFixed(1)),
  status: "PUBLISHED" as const,
  aiCheck: "PASS",
  createdAt: new Date(Date.now() - id * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - id * 86400000).toISOString(),
});

export const scrapHandlers = [
  // 내 북마크 WORK 리스트 조회
  http.get(serverUrl("/api/mypage/scraps/works"), () => {
    // 스크랩된 작품 ID 목록에 해당하는 작품들 생성
    const scrappedWorks = scrappedWorkIds.map((id) => createMockWork(id));

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "WORK 스크랩 목록 조회 완료",
      data: scrappedWorks,
    });
  }),

  // 내 북마크 POST 리스트 조회
  http.get(serverUrl("/api/mypage/scraps/posts"), () => {
    const scrappedPostIds = [1, 2, 3, 5, 8, 13];
    const scrappedPosts = scrappedPostIds.map((id) => createMockPost(id));

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "POST 스크랩 목록 조회 완료",
      data: scrappedPosts,
    });
  }),

  // WORK 스크랩 등록
  http.post(serverUrl("/api/scraps/works/:workId"), ({ params }) => {
    const { workId } = params;
    const workIdNum = parseInt(workId as string);

    // 스크랩 목록에 추가 (중복 방지)
    if (!scrappedWorkIds.includes(workIdNum)) {
      scrappedWorkIds.push(workIdNum);
    }

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "스크랩 등록 완료",
      data: {
        id: Date.now(),
        targetType: "WORK",
        targetId: workIdNum,
        title: `작품 제목 ${workIdNum}`,
        createdAt: new Date().toISOString(),
      },
    });
  }),

  // POST 스크랩 등록
  http.post(serverUrl("/api/scraps/posts/:postId"), ({ params }) => {
    const { postId } = params;
    const postIdNum = parseInt(postId as string);

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "스크랩 등록 완료",
      data: {
        id: Date.now(),
        targetType: "POST",
        targetId: postIdNum,
        title: `포스트 제목 ${postIdNum}`,
        createdAt: new Date().toISOString(),
      },
    });
  }),

  // WORK 스크랩 삭제
  http.delete(serverUrl("/api/scraps/works/:workId"), ({ params }) => {
    const { workId } = params;
    const workIdNum = parseInt(workId as string);

    // 스크랩 목록에서 제거
    const index = scrappedWorkIds.indexOf(workIdNum);
    if (index > -1) {
      scrappedWorkIds.splice(index, 1);
    }

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "스크랩 취소 완료",
      data: "스크랩 취소 완료",
    });
  }),

  // POST 스크랩 삭제
  http.delete(serverUrl("/api/scraps/posts/:postId"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "스크랩 취소 완료",
      data: "스크랩 취소 완료",
    });
  }),
];
