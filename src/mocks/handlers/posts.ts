import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 포스트 데이터 저장소
const mockDrafts: Record<string, unknown> = {};

// 가짜 포스트 데이터 생성 함수
const createMockPost = (id: number) => ({
  id,
  title: `포스트 제목 ${id}`,
  content: `포스트 내용 ${id}입니다. 이것은 멋진 이야기입니다...`,
  authorName: `작가${(id % 10) + 1}`,
  workTitle: `작품 제목 ${Math.floor(id / 10) + 1}`,
  status: "PUBLISHED" as const,
  workType: (id % 2 === 0 ? "SHORT" : "SERIALIZED") as "SHORT" | "SERIALIZED",
  creationType: (id % 3 === 0 ? "DERIVATIVE" : "ORIGINAL") as "ORIGINAL" | "DERIVATIVE",
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  updatedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
});

export const postsHandlers = [
  // 포스트 생성 (AI 검수 포함)
  http.post(serverUrl("/api/works/posts"), async ({ request }) => {
    const body = await request.json();
    const postId = Math.floor(Math.random() * 10000) + 1;

    const post = {
      id: postId,
      ...createMockPost(postId),
      ...(body as object),
    };

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "작품 게시가 완료되었습니다.",
      data: post,
    });
  }),

  // 포스트 임시저장
  http.post(serverUrl("/api/works/posts/save"), async ({ request }) => {
    const body = await request.json();
    const draftId = Math.floor(Math.random() * 10000) + 1;

    const draft = {
      id: draftId,
      ...createMockPost(draftId),
      ...(body as object),
      status: "DRAFT" as const,
    };

    mockDrafts[draftId.toString()] = draft;

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "임시 저장되었습니다.",
      data: draft,
    });
  }),

  // 임시저장 포스트 이어서 작성
  http.patch(
    serverUrl("/api/works/posts/continue/:id"),
    async ({ request, params }) => {
      const { id } = params;
      const body = await request.json();
      const draftId = id as string;

      const existingDraft = mockDrafts[draftId] || createMockPost(parseInt(draftId));
      const updatedDraft = {
        ...(existingDraft as object),
        ...(body as object),
        id: parseInt(draftId),
        updatedAt: new Date().toISOString(),
      };

      mockDrafts[draftId] = updatedDraft;

      return HttpResponse.json({
        success: true,
        code: 200,
        message: "수정이 완료되었습니다.",
        data: updatedDraft,
      });
    },
  ),

  // 임시저장 포스트 조회
  http.get(serverUrl("/api/works/posts/drafts/:id"), ({ params }) => {
    const { id } = params;
    const draftId = id as string;

    const draft = mockDrafts[draftId] || {
      ...createMockPost(parseInt(draftId)),
      status: "DRAFT" as const,
    };

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "임시저장 조회 완료",
      data: draft,
    });
  }),

  // 모든 임시저장 포스트 조회
  http.get(serverUrl("/api/works/posts/drafts/all"), () => {
    const drafts = Object.values(mockDrafts).filter(
      (draft) => (draft as { status?: string }).status === "DRAFT",
    );

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "임시저장 목록 조회 완료",
      data: drafts,
    });
  }),

  // 임시저장 포스트 삭제
  http.delete(serverUrl("/api/works/posts/drafts/:id"), ({ params }) => {
    const { id } = params;
    const draftId = id as string;
    delete mockDrafts[draftId];

    return HttpResponse.json({
      success: true,
      code: 200,
      message: `삭제가 완료되었습니다. ID: ${draftId}`,
      data: null,
    });
  }),
];

