import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

export const usersHandlers = [
  // 내 프로필 수정 (multipart/form-data)
  // 백엔드는 BaseResponse가 아닌 일반 ResponseEntity로 문자열 반환
  http.put(serverUrl("/api/mypage/profile"), async () => {
    return HttpResponse.text("프로필이 성공적으로 수정되었습니다.", {
      status: 200,
    });
  }),
];
