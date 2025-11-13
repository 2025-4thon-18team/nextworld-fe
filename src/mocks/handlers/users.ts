import { http, HttpResponse } from "msw";

export const usersHandlers = [
  // 내 프로필 수정
  http.patch("/api/users/me/profile", async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      data: {
        userId: "user-1",
        email: "test@example.com",
        nickname: (body as { nickname?: string }).nickname || "테스트유저",
        profileImage:
          (body as { profileImage?: string }).profileImage ||
          "https://via.placeholder.com/150",
        bio: (body as { bio?: string }).bio || "",
        updatedAt: new Date().toISOString(),
      },
    });
  }),
];
