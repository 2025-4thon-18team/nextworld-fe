import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 댓글 데이터 저장소
const mockComments: Record<
  string,
  Array<{
    id: number;
    postId: number;
    parentCommentId: number | null;
    authorId: number;
    authorName: string;
    authorImageUrl: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }>
> = {};

// 댓글 ID 카운터
let commentIdCounter = 1;

export const commentsHandlers = [
  // 댓글 생성
  http.post(
    serverUrl("/api/posts/:postId/comments"),
    async ({ request, params }) => {
      const { postId } = params;
      const body = await request.json();
      const { content, parentCommentId } = body as {
        content: string;
        parentCommentId?: number | null;
      };

      const comment = {
        id: commentIdCounter++,
        postId: parseInt(postId as string),
        parentCommentId: parentCommentId ?? null,
        authorId: 1,
        authorName: "테스트유저",
        authorImageUrl: "https://placehold.co/50?text=User",
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!mockComments[postId as string]) {
        mockComments[postId as string] = [];
      }
      mockComments[postId as string].push(comment);

      return HttpResponse.json({
        success: true,
        code: 200,
        message: "댓글이 등록되었습니다.",
        data: comment,
      });
    },
  ),

  // 댓글 생성순 조회 (인증 불필요)
  http.get(serverUrl("/api/posts/:postId/comments"), ({ params }) => {
    const { postId } = params;
    const comments = mockComments[postId as string] || [];

    // 생성순으로 정렬
    const sortedComments = [...comments].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "댓글 목록을 조회했습니다.",
      data: sortedComments,
    });
  }),

  // 댓글 수정
  http.put(
    serverUrl("/api/posts/comments/:commentId"),
    async ({ request, params }) => {
      const { commentId } = params;
      const body = await request.json();
      const { content } = body as { content: string };

      // 모든 포스트의 댓글에서 찾기
      let foundComment = null;
      for (const postId in mockComments) {
        const commentIndex = mockComments[postId].findIndex(
          (c) => c.id === parseInt(commentId as string),
        );
        if (commentIndex !== -1) {
          foundComment = mockComments[postId][commentIndex];
          mockComments[postId][commentIndex] = {
            ...foundComment,
            content,
            updatedAt: new Date().toISOString(),
          };
          break;
        }
      }

      if (!foundComment) {
        return HttpResponse.json(
          {
            success: false,
            code: 404,
            message: "댓글을 찾을 수 없습니다.",
            data: null,
          },
          { status: 404 },
        );
      }

      return HttpResponse.json({
        success: true,
        code: 200,
        message: "댓글이 수정되었습니다.",
        data: {
          ...foundComment,
          content,
          updatedAt: new Date().toISOString(),
        },
      });
    },
  ),

  // 댓글 삭제
  http.delete(serverUrl("/api/posts/comments/:commentId"), ({ params }) => {
    const { commentId } = params;
    const commentIdNum = parseInt(commentId as string);

    // 모든 포스트의 댓글에서 찾아서 삭제
    for (const postId in mockComments) {
      const commentIndex = mockComments[postId].findIndex(
        (c) => c.id === commentIdNum,
      );
      if (commentIndex !== -1) {
        mockComments[postId].splice(commentIndex, 1);
        break;
      }
    }

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "댓글이 삭제되었습니다.",
      data: "댓글이 삭제되었습니다.",
    });
  }),
];
