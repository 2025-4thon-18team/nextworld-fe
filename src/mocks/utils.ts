/**
 * MSW 핸들러에서 사용할 절대 URL 생성 함수
 * VITE_SERVER_URL을 baseURL로 사용하여 절대 URL을 생성합니다.
 */
export function serverUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
  return new URL(path, baseUrl).href;
}

