import type { UserPort } from "./types";

const userPortInstance: UserPort = {
  async getPoints() {
    // TODO: 실제 API 호출로 교체
    return 2000;
  },
  async getProfile() {
    // TODO: 실제 API 호출로 교체
    return {
      name: "[작가명]",
      bio: ["안녕하세요 누구입니다 안녕", "나 누구 좋아한다.."],
      contact: "작가 개인 sns, 이메일",
    };
  },
};

export function createUserPort(): UserPort {
  return userPortInstance;
}

