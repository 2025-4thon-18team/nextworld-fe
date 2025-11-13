import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 작품 데이터 저장소
const mockWorks: Record<string, unknown> = {};
const mockDrafts: Record<string, unknown> = {};

// 가짜 작품 데이터 생성 함수
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

export const worksHandlers = [
  // 작품 목록 조회 (workType 필터링 가능)
  http.get(serverUrl("/api/works"), ({ request }) => {
    const url = new URL(request.url);
    const workType = url.searchParams.get("workType") as
      | "ORIGINAL"
      | "DERIVATIVE"
      | null;

    const allWorks = Array.from({ length: 50 }, (_, i) => {
      const type: "ORIGINAL" | "DERIVATIVE" =
        i % 3 === 0 ? "DERIVATIVE" : "ORIGINAL";
      return createMockWork(i + 1, type);
    });

    const filteredWorks = workType
      ? allWorks.filter((work) => work.workType === workType)
      : allWorks;

    return HttpResponse.json({ data: filteredWorks });
  }),

  // 작품 상세 조회
  http.get(serverUrl("/api/works/:id"), ({ params }) => {
    const { id } = params;
    const workId = parseInt(id as string);
    const workType: "ORIGINAL" | "DERIVATIVE" =
      workId % 3 === 0 ? "DERIVATIVE" : "ORIGINAL";

    const work = createMockWork(workId, workType);

    return HttpResponse.json({ data: work });
  }),

  // 1차 작품 등록
  http.post(serverUrl("/api/works/original"), async ({ request }) => {
    const body = await request.json();
    const workId = "work-original-" + Date.now();

    const work = {
      workId,
      ...(body as object),
      authorId: "user-1",
      createdAt: new Date().toISOString(),
    };

    mockWorks[workId] = work;

    return HttpResponse.json(
      {
        data: work,
      },
      { status: 201 },
    );
  }),

  // 1차 작품 수정
  http.patch(serverUrl("/api/works/original"), async ({ request }) => {
    const body = await request.json();
    const { workId } = body as { workId: string };

    const updatedWork = {
      ...(mockWorks[workId] as object),
      ...(body as object),
      updatedAt: new Date().toISOString(),
    };

    mockWorks[workId] = updatedWork;

    return HttpResponse.json({
      data: updatedWork,
    });
  }),

  // 2차 작품 등록
  http.post(serverUrl("/api/works/derivative"), async ({ request }) => {
    const body = await request.json();
    const workId = "work-derivative-" + Date.now();

    const work = {
      workId,
      ...(body as object),
      authorId: "user-1",
      createdAt: new Date().toISOString(),
    };

    mockWorks[workId] = work;

    return HttpResponse.json(
      {
        data: work,
      },
      { status: 201 },
    );
  }),

  // 2차 작품 수정
  http.patch(
    serverUrl("/api/works/derivative/:work_id"),
    async ({ request, params }) => {
      const body = await request.json();
      const { work_id } = params;

      const updatedWork = {
        workId: work_id,
        ...(mockWorks[work_id as string] as object),
        ...(body as object),
        updatedAt: new Date().toISOString(),
      };

      mockWorks[work_id as string] = updatedWork;

      return HttpResponse.json({
        data: updatedWork,
      });
    },
  ),

  // 2차 작품 임시저장
  http.post(serverUrl("/api/works/derivative/save"), async ({ request }) => {
    const body = await request.json();
    const draftId = "draft-" + Date.now();

    const draft = {
      draftId,
      ...(body as object),
      savedAt: new Date().toISOString(),
    };

    mockDrafts[draftId] = draft;

    return HttpResponse.json({
      data: draft,
    });
  }),

  // 임시저장 작품 조회
  http.get(
    serverUrl("/api/works/derivative/drafts/:draft_id"),
    ({ params }) => {
      const { draft_id } = params;

      const draft = mockDrafts[draft_id as string] || {
        draftId: draft_id,
        title: "임시저장된 작품",
        content: "임시저장된 내용입니다...",
        savedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return HttpResponse.json({
        data: draft,
      });
    },
  ),

  // 임시저장 작품 삭제
  http.delete(
    serverUrl("/api/works/derivative/drafts/:draft_id"),
    ({ params }) => {
      const { draft_id } = params;
      delete mockDrafts[draft_id as string];

      return HttpResponse.json({
        message: "임시저장 작품이 삭제되었습니다.",
      });
    },
  ),

  // 2차 작품 이어쓰기
  http.patch(
    serverUrl("/api/works/derivative/continue/:draft_id"),
    async ({ request, params }) => {
      const body = await request.json();
      const { draft_id } = params;
      const workId = "work-derivative-" + Date.now();

      const work = {
        workId,
        ...(mockDrafts[draft_id as string] as object),
        ...(body as object),
        authorId: "user-1",
        createdAt: new Date().toISOString(),
      };

      mockWorks[workId] = work;
      delete mockDrafts[draft_id as string];

      return HttpResponse.json({
        data: work,
      });
    },
  ),

  // AI 가이드라인 검토
  http.post(
    serverUrl("/api/works/derivative/api/ai/check"),
    async ({ request }) => {
      const body = await request.json();
      const { content } = body as { content: string };

      // 특정 키워드가 있으면 위반으로 처리
      const hasViolation =
        content.includes("폭력") ||
        content.includes("혐오") ||
        content.includes("선정적");

      return HttpResponse.json({
        data: {
          isViolation: hasViolation,
          violations: hasViolation
            ? [
                {
                  type: "inappropriate_content",
                  description: "부적절한 내용이 포함되어 있습니다.",
                  severity: "high" as const,
                },
              ]
            : [],
          suggestions: hasViolation
            ? ["해당 내용을 수정하거나 삭제해주세요."]
            : undefined,
        },
      });
    },
  ),

  // 작품 좋아요
  http.post(serverUrl("/api/works/:work_id/like"), ({ params }) => {
    const { work_id } = params;

    return HttpResponse.json({
      data: {
        workId: work_id,
        liked: true,
        likesCount: Math.floor(Math.random() * 1000) + 1,
      },
    });
  }),

  // 작품 좋아요 조회
  http.get(serverUrl("/api/works/:work_id/like"), ({ params }) => {
    const { work_id } = params;

    return HttpResponse.json({
      data: {
        workId: work_id,
        liked: Math.random() > 0.5,
        likesCount: Math.floor(Math.random() * 1000),
      },
    });
  }),

  // 작품 북마크
  http.post(serverUrl("/api/works/:work_id/bookmark"), ({ params }) => {
    const { work_id } = params;

    return HttpResponse.json({
      data: {
        workId: work_id,
        bookmarked: true,
      },
    });
  }),

  // 댓글 목록 조회
  http.get(serverUrl("/api/works/:work_id/comments"), ({ request, params }) => {
    const { work_id } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

    const comments = Array.from({ length: 30 }, (_, i) => ({
      commentId: `comment-${i + 1}`,
      workId: work_id,
      userId: `user-${(i % 5) + 1}`,
      userName: `사용자${(i % 5) + 1}`,
      content: `댓글 내용 ${i + 1}입니다.`,
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    }));

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pageComments = comments.slice(startIdx, endIdx);

    return HttpResponse.json({
      data: {
        comments: pageComments,
        totalCount: comments.length,
        page,
        pageSize,
      },
    });
  }),

  // 댓글 작성
  http.post(
    serverUrl("/api/works/:work_id/comments"),
    async ({ request, params }) => {
      const { work_id } = params;
      const body = await request.json();
      const { content } = body as { content: string };

      const comment = {
        commentId: "comment-" + Date.now(),
        workId: work_id,
        userId: "user-1",
        userName: "테스트유저",
        content,
        createdAt: new Date().toISOString(),
      };

      return HttpResponse.json(
        {
          data: {
            comment,
          },
        },
        { status: 201 },
      );
    },
  ),
];
