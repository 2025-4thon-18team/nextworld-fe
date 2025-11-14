import { http, HttpResponse } from "msw";
import {
  authHandlers,
  usersHandlers,
  mypageHandlers,
  paymentHandlers,
  revenueHandlers,
  worksHandlers,
  postsHandlers,
  feedHandlers,
  adminHandlers,
  scrapHandlers,
  commentsHandlers,
  likesHandlers,
} from "./handlers";
import { serverUrl } from "./utils";

export const handlers = [
  // 데모 핸들러 (테스트용)
  http.get(serverUrl("/api/v1/demo/"), () => {
    return HttpResponse.json({
      message: "From mock server",
    });
  }),
  http.get(serverUrl("/api/v1/demo/:id"), ({ params }) => {
    return HttpResponse.json({
      id: params.id,
    });
  }),
  http.get(serverUrl("/api/user"), () => {
    return HttpResponse.json({
      name: "홍길동",
      age: 30,
    });
  }),

  // 실제 API 핸들러
  ...authHandlers,
  ...usersHandlers,
  ...mypageHandlers,
  ...paymentHandlers,
  ...revenueHandlers,
  ...worksHandlers,
  ...postsHandlers,
  ...feedHandlers,
  ...adminHandlers,
  ...scrapHandlers,
  ...commentsHandlers,
  ...likesHandlers,
];
