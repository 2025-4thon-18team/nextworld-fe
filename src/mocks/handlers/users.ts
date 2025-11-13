import { http, HttpResponse } from "msw";

export const usersHandlers = [
  // 내 프로필 수정 (multipart/form-data)
  http.put("/api/mypage/profile", async () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "프로필이 성공적으로 수정되었습니다.",
      data: null,
    });
  }),
];
