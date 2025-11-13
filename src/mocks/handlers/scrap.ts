import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 작품 데이터 생성 함수 (works.ts와 동일한 구조)
const createMockWork = (id: number, workType: "ORIGINAL" | "DERIVATIVE") => ({
  id,
  workType,
  title: `${workType === "ORIGINAL" ? "원작" : "2차창작"} 작품 제목 ${id}`,
  description: `작품 설명 ${id}입니다. 이것은 멋진 이야기입니다...`,
  coverImageUrl: `https://placehold.co/300x400?text=Work${id}`,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  category: `카테고리${(id % 4) + 1}`,
  serializationSchedule: "월|화|수",
  allowDerivative: workType === "ORIGINAL",
  totalLikesCount: Math.floor(Math.random() * 1000),
  totalViewsCount: Math.floor(Math.random() * 5000),
  totalRating: Number((Math.random() * 5).toFixed(2)),
  authorName: `작가${(id % 10) + 1}`,
  ...(workType === "DERIVATIVE" && {
    parentWorkId: Math.floor(Math.random() * 10) + 1,
    parentWorkTitle: `원작 작품 ${Math.floor(Math.random() * 10) + 1}`,
  }),
});

// 스크랩된 작품 ID 목록 (시뮬레이션용)
const scrappedWorkIds = [1, 3, 5, 7, 9, 12, 15, 18, 21, 24];

export const scrapHandlers = [
  // 스크랩된 작품 목록 조회
  http.get(serverUrl("/api/scraps/works"), () => {
    // 스크랩된 작품 ID 목록에 해당하는 작품들 생성
    const scrappedWorks = scrappedWorkIds.map((id) => {
      const workType: "ORIGINAL" | "DERIVATIVE" =
        id % 3 === 0 ? "DERIVATIVE" : "ORIGINAL";
      return createMockWork(id, workType);
    });

    return HttpResponse.json(scrappedWorks);
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
      id: Date.now(),
      targetType: "WORK",
      targetId: workIdNum,
      title: `작품 제목 ${workIdNum}`,
      createdAt: new Date().toISOString(),
    });
  }),

  // POST 스크랩 등록
  http.post(serverUrl("/api/scraps/posts/:postId"), ({ params }) => {
    const { postId } = params;
    const postIdNum = parseInt(postId as string);

    return HttpResponse.json({
      id: Date.now(),
      targetType: "POST",
      targetId: postIdNum,
      title: `포스트 제목 ${postIdNum}`,
      createdAt: new Date().toISOString(),
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

    return HttpResponse.json("스크랩 취소 완료");
  }),

  // POST 스크랩 삭제
  http.delete(serverUrl("/api/scraps/posts/:postId"), () => {
    return HttpResponse.json("스크랩 취소 완료");
  }),
];

