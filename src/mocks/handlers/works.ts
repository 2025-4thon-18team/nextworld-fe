import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 작품 데이터 생성 함수
const createMockWork = (id: number) => ({
  id,
  title: `작품 제목 ${id}`,
  description: `작품 설명 ${id}입니다. 이것은 멋진 이야기입니다...`,
  coverImageUrl: `https://placehold.co/300x400?text=Work${id}`,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  universeDescription: `유니버스 설명 ${id}`,
  allowDerivative: id % 2 === 0,
  guidelineRelation: "관계 가이드라인",
  guidelineContent: "내용 가이드라인",
  guidelineBackground: "배경 가이드라인",
  bannedWords: ["금지어1", "금지어2"],
  isPaid: id % 3 === 0,
  price: id % 3 === 0 ? (id % 10 + 1) * 100 : 0,
  allowDerivativeProfit: id % 2 === 0,
  authorName: `작가${(id % 10) + 1}`,
});

export const worksHandlers = [
  // 작품 생성
  http.post(serverUrl("/api/works"), async ({ request }) => {
    const body = await request.json();
    const workId = Math.floor(Math.random() * 10000) + 1;

    const work = {
      id: workId,
      ...createMockWork(workId),
      ...(body as object),
    };

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "작품이 성공적으로 생성되었습니다.",
      data: work,
    });
  }),

  // 작품 이미지 업로드 (multipart/form-data)
  http.post(serverUrl("/api/works/upload-image"), async () => {
    const imageUrl = `https://placehold.co/300x400?text=Uploaded${Date.now()}`;

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "이미지 업로드가 완료되었습니다.",
      data: imageUrl,
    });
  }),

  // 작품 삭제
  http.delete(serverUrl("/api/works/:id"), ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      success: true,
      code: 200,
      message: `작품이 성공적으로 삭제되었습니다. ID: ${id}`,
      data: null,
    });
  }),
];
