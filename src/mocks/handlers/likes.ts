import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

export const likesHandlers = [
  // 좋아요 등록
  http.post(serverUrl("/api/likes/:workId"), ({ params }) => {
    const { workId } = params;
    const workIdNum = parseInt(workId as string);

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "좋아요 등록 완료",
      data: {
        id: Date.now(),
        workId: workIdNum,
        workName: `작품 제목 ${workIdNum}`,
        createdAt: new Date().toISOString(),
      },
    });
  }),

  // 좋아요 취소
  http.delete(serverUrl("/api/likes/:workId"), ({ params }) => {
    const { workId } = params;

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "좋아요 취소 완료",
      data: "좋아요 취소 완료",
    });
  }),
];

