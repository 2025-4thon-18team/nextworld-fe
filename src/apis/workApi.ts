// src/apis/workApi.ts
import { axiosInstance } from "@/apis/axiosInstance";

// ✅ Episode 데이터 타입 정의
export interface Episode {
  id: number;
  title: string;
  date: string;
  star: string;
  view: string;
  cmt: string;
  price: string;
}

// ✅ 더미데이터 (fallback용)
const fallbackEpisodes: Episode[] = [
  {
    id: 1,
    title: "1화 - 더미 데이터의 시작",
    date: "2025.11.09",
    star: "4.8",
    view: "210",
    cmt: "5",
    price: "무료",
  },
  {
    id: 2,
    title: "2화 - 전개되는 더미 스토리",
    date: "2025.11.10",
    star: "4.7",
    view: "180",
    cmt: "2",
    price: "유료",
  },
  {
    id: 3,
    title: "3화 - 클라이맥스 (더미)",
    date: "2025.11.11",
    star: "4.9",
    view: "240",
    cmt: "3",
    price: "유료",
  },
];

export const workApi = {
  // ✅ API 호출
  getEpisodes: async (workId: number): Promise<Episode[]> => {
    try {
      console.log("📡 [workApi] 호출 시작:", `/works/${workId}/episodes`);
      const res = await axiosInstance.get(`/works/${workId}/episodes`);
      console.log("✅ [workApi] 응답 성공:", res.data);
      return res.data;
    } catch (error) {
      console.error("🚨 [workApi.getEpisodes] 실패:", error);

      // ✅ API 실패 시 fallbackEpisodes 반환
      console.warn("⚠ 서버 응답 실패 → 더미데이터로 대체합니다.");
      return fallbackEpisodes;
    }
  },
};
