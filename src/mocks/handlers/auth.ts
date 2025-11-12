import { http, HttpResponse } from "msw";

// 가짜 사용자 데이터
const mockUser = {
  userId: "user-1",
  email: "test@example.com",
  nickname: "테스트유저",
  profileImage: "https://via.placeholder.com/150",
  createdAt: new Date().toISOString(),
};

export const authHandlers = [
  // 회원가입
  http.post("/api/auth/signup", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        data: {
          userId: "user-" + Math.random().toString(36).substr(2, 9),
          email: (body as { email: string }).email,
          nickname: (body as { nickname: string }).nickname,
        },
      },
      { status: 201 },
    );
  }),

  // 로그인
  http.post("/api/auth/login", async ({ request }) => {
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
      data: {
        accessToken: "mock-access-token-" + Date.now(),
        refreshToken: "mock-refresh-token-" + Date.now(),
        user: mockUser,
      },
    });
  }),

  // 로그아웃
  http.post("/api/auth/logout", () => {
    return HttpResponse.json({
      message: "로그아웃되었습니다.",
    });
  }),

  // 액세스 토큰 재발급
  http.post("/api/auth/refresh", () => {
    return HttpResponse.json({
      data: {
        accessToken: "mock-access-token-refreshed-" + Date.now(),
        refreshToken: "mock-refresh-token-refreshed-" + Date.now(),
      },
    });
  }),

  // 내 계정 정보 조회
  http.get("/api/auth/me", () => {
    return HttpResponse.json({
      data: mockUser,
    });
  }),
];
