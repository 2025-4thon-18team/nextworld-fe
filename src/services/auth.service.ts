import type { AuthPort } from "./types";

const authPortInstance: AuthPort = {
  async login(email: string, password: string) {
    // TODO: 실제 API 호출로 교체
    console.log("Login:", { email, password });
  },
  async signup(data) {
    // TODO: 실제 API 호출로 교체
    console.log("Signup:", data);
  },
};

export function createAuthPort(): AuthPort {
  return authPortInstance;
}
