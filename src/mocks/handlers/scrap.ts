import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 스크랩된 작품 ID 목록 (시뮬레이션용)
const scrappedWorkIds = [1, 3, 5, 7, 9, 12, 15, 18, 21, 24];

export const scrapHandlers = [
  // 내 북마크 WORK 리스트 조회
  http.get(serverUrl("/api/mypage/scraps/works"), () => {
    // 스크랩된 작품 ID 목록에 해당하는 작품들 생성
    const scrappedWorks = scrappedWorkIds.map((id) => {
      return {
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
        price: id % 3 === 0 ? ((id % 10) + 1) * 100 : 0,
        allowDerivativeProfit: id % 2 === 0,
        authorName: `작가${(id % 10) + 1}`,
      };
    });

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
    const scrappedPosts = scrappedPostIds.map((id) => ({
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
    }));

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
