import { http, HttpResponse } from "msw";
import {
  authHandlers,
  usersHandlers,
  mypageHandlers,
  paymentHandlers,
  revenueHandlers,
  worksHandlers,
  feedHandlers,
  reportHandlers,
  adminHandlers,
} from "./handlers";

export const handlers = [
  // 데모 핸들러 (테스트용)
  http.get("/api/v1/demo/", () => {
    return HttpResponse.json({
      message: "From mock server",
    });
  }),
  http.get("/api/v1/demo/:id", ({ params }) => {
    return HttpResponse.json({
      id: params.id,
    });
  }),
  http.get("/api/user", () => {
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
  ...feedHandlers,
  ...reportHandlers,
  ...adminHandlers,
];
