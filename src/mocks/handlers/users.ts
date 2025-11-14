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

  // 작가 프로필 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/author/:authorId/profile"), ({ params }) => {
    const { authorId } = params;
    const authorIdNum = parseInt(authorId as string);

    const profile = {
      authorId: authorIdNum,
      nickname: `작가${authorIdNum}`,
      bio: `작가 ${authorIdNum}의 소개입니다.`,
      contactEmail: `author${authorIdNum}@example.com`,
      twitter: `@author${authorIdNum}`,
      profileImageUrl: `https://placehold.co/150?text=Author${authorIdNum}`,
    };

    return HttpResponse.json(profile);
  }),

  // 작가 작품 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/author/:authorId/works"), ({ params }) => {
    const { authorId } = params;
    const authorIdNum = parseInt(authorId as string);

    const works = Array.from({ length: 10 }, (_, i) => ({
      workId: i + 1,
      title: `작품 제목 ${i + 1}`,
      coverImageUrl: `https://placehold.co/300x400?text=Work${i + 1}`,
      category: `카테고리${(i % 5) + 1}`,
      workType: i % 2 === 0 ? "ORIGINAL" : "DERIVATIVE",
      tags: [`태그${i % 5}`, `장르${i % 3}`],
    }));

    return HttpResponse.json(works);
  }),

  // 작가 포스트 조회 (BaseResponse 없이 직접 반환)
  http.get(serverUrl("/api/author/:authorId/posts"), ({ params }) => {
    const { authorId } = params;
    const authorIdNum = parseInt(authorId as string);

    const posts = Array.from({ length: 10 }, (_, i) => ({
      postId: i + 1,
      workId: i % 3 === 0 ? null : Math.floor(i / 3) + 1,
      title: `포스트 제목 ${i + 1}`,
      thumbnailUrl: i % 2 === 0 ? `https://placehold.co/200x150?text=Post${i + 1}` : null,
      tags: [`태그${i % 5}`, `장르${i % 3}`],
    }));

    return HttpResponse.json(posts);
  }),
];
