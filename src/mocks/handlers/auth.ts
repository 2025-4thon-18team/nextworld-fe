import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 사용자 데이터
const mockUser = {
  userId: "user-1",
  email: "test@example.com",
  nickname: "테스트유저",
  profileImage: "https://placehold.co/150",
  createdAt: new Date().toISOString(),
};

export const authHandlers = [
  // 회원가입
  http.post(serverUrl("/api/auth/signup"), async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        success: true,
        code: 200,
        message: "회원가입이 완료되었습니다.",
        data: {
          userId: Math.floor(Math.random() * 1000),
          email: (body as { email: string }).email,
          nickname: (body as { nickname: string }).nickname,
        },
      },
      { status: 200 },
    );
  }),

  // 로그인
  http.post(serverUrl("/api/auth/login"), async ({ request }) => {
    const body = await request.json();
    const { email } = body as { email: string };

    // 실패 케이스 시뮬레이션
    if (email === "fail@example.com") {
      return HttpResponse.json(
        { message: "이메일 또는 비밀번호가 일치하지 않습니다." },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "로그인 성공",
      data: {
        accessToken: "mock-access-token-" + Date.now(),
        refreshToken: "mock-refresh-token-" + Date.now(),
        email: mockUser.email,
        nickname: mockUser.nickname,
      },
    });
  }),

  // 로그아웃
  http.post(serverUrl("/api/auth/logout"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "로그아웃 되었습니다.",
      data: null,
    });
  }),

  // 액세스 토큰 재발급
  http.post(serverUrl("/api/auth/refresh"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "액세스 토큰이 재발급되었습니다.",
      data: "mock-access-token-refreshed-" + Date.now(),
    });
  }),

  // 내 계정 정보 조회
  http.get(serverUrl("/api/auth/me"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "프로필 조회 성공",
      data: {
        userId: 1,
        email: mockUser.email,
        nickname: mockUser.nickname,
        name: "홍길동",
        profileImageUrl: "https://placehold.co/150?text=User",
        pointsBalance: 2000,
      },
    });
  }),
];
