import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 포스트 데이터 저장소
const mockDrafts: Record<string, unknown> = {};

// 가짜 포스트 데이터 생성 함수
const createMockPost = (id: number, options?: {
  workId?: number | null;
  postType?: "POST" | "EPISODE";
  episodeNumber?: number | null;
  parentWorkId?: number | null;
}) => ({
  id,
  title: `포스트 제목 ${id}`,
  content: `포스트 내용 ${id}입니다. 이것은 멋진 이야기입니다...`,
  hasImage: id % 2 === 0,
  workId: options?.workId ?? (id % 3 === 0 ? null : Math.floor(id / 10) + 1),
  workTitle: options?.workId !== null ? `작품 제목 ${options?.workId || Math.floor(id / 10) + 1}` : null,
  postType: options?.postType ?? (id % 3 === 0 ? "POST" : "EPISODE"),
  episodeNumber: options?.episodeNumber ?? (id % 3 === 0 ? null : (id % 10) + 1),
  parentWorkId: options?.parentWorkId ?? (id % 5 === 0 ? Math.floor(id / 5) : null),
  parentWorkTitle: options?.parentWorkId ? `원작 작품 ${options.parentWorkId}` : null,
  authorName: `작가${(id % 10) + 1}`,
  creationType: (id % 3 === 0 ? "DERIVATIVE" : "ORIGINAL") as "ORIGINAL" | "DERIVATIVE",
  isPaid: id % 3 === 0,
  price: id % 3 === 0 ? (id % 10 + 1) * 100 : null,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  viewsCount: Math.floor(Math.random() * 1000),
  commentsCount: Math.floor(Math.random() * 100),
  rating: Number((Math.random() * 5).toFixed(1)),
  status: "PUBLISHED" as const,
  aiCheck: "PASS",
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  updatedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
});

export const postsHandlers = [
  // 독립 포스트 생성 (BaseResponse 없이 직접 반환)
  http.post(serverUrl("/api/posts"), async ({ request }) => {
    const body = await request.json();
    const postId = Math.floor(Math.random() * 10000) + 1;

    const post = {
      id: postId,
      ...createMockPost(postId, { postType: "POST", workId: null, episodeNumber: null }),
      ...(body as object),
    };

    return HttpResponse.json(post);
  }),

  // 작품 회차 생성 (BaseResponse 없이 직접 반환)
  http.post(serverUrl("/api/posts/works/:workId"), async ({ request, params }) => {
    const { workId } = params;
    const body = await request.json();
    const postId = Math.floor(Math.random() * 10000) + 1;

    const post = {
      id: postId,
      ...createMockPost(postId, {
        workId: parseInt(workId as string),
        postType: "EPISODE",
        episodeNumber: (postId % 10) + 1,
      }),
      ...(body as object),
    };

    return HttpResponse.json(post);
  }),

  // 포스트 목록 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/posts"), ({ request }) => {
    const url = new URL(request.url);
    const workId = url.searchParams.get("workId");
    
    const posts = Array.from({ length: 20 }, (_, i) => createMockPost(i + 1));
    
    // workId 필터링
    const filteredPosts = workId
      ? posts.filter((post) => post.workId === parseInt(workId))
      : posts;

    return HttpResponse.json(filteredPosts);
  }),

  // 포스트 상세 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/posts/:id"), ({ params }) => {
    const { id } = params;
    const postId = parseInt(id as string);
    const post = createMockPost(postId);

    return HttpResponse.json(post);
  }),

  // 포스트 임시저장 (BaseResponse 없이 직접 반환)
  http.post(serverUrl("/api/posts/drafts"), async ({ request }) => {
    const body = await request.json();
    const draftId = Math.floor(Math.random() * 10000) + 1;

    const draft = {
      id: draftId,
      ...createMockPost(draftId),
      ...(body as object),
      status: "DRAFT" as const,
    };

    mockDrafts[draftId.toString()] = draft;

    return HttpResponse.json(draft);
  }),

  // 임시저장 목록 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/posts/drafts"), () => {
    const drafts = Object.values(mockDrafts).filter(
      (draft) => (draft as { status?: string }).status === "DRAFT",
    );

    return HttpResponse.json(drafts);
  }),

  // 임시저장 단일 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/posts/drafts/:id"), ({ params }) => {
    const { id } = params;
    const draftId = id as string;

    const draft = mockDrafts[draftId] || {
      ...createMockPost(parseInt(draftId)),
      status: "DRAFT" as const,
    };

    return HttpResponse.json(draft);
  }),

  // 포스트 수정 (BaseResponse 없이 직접 반환)
  http.put(serverUrl("/api/posts/:id"), async ({ request, params }) => {
    const { id } = params;
    const body = await request.json();
    const postId = parseInt(id as string);

    const post = {
      ...createMockPost(postId),
      ...(body as object),
      id: postId,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(post);
  }),

  // 포스트 삭제 (BaseResponse 없이 직접 반환)
  http.delete(serverUrl("/api/posts/:id"), ({ params }) => {
    const { id } = params;
    return HttpResponse.text(`포스트가 성공적으로 삭제되었습니다. ID: ${id}`);
  }),
];

