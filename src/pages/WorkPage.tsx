// src/pages/WorkPage.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Webtoon from "@/assets/dummycover.png";
import { useWorkEpisodes } from "@/hooks/useWorkEpisodes";
import { Episode } from "@/apis/workApi";

const WorkPage: React.FC = () => {
  const { id } = useParams();
  const workId = Number(id) || 1;

  const {
    data: episodes = [],
    isLoading,
    isError,
    error,
  } = useWorkEpisodes(workId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300 bg-neutral-900">
        불러오는 중...
      </div>
    );
  }

  if (isError) {
    console.error("❌ WorkPage API Error:", error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      <Header />

      <main className="relative z-10 w-full">
        <div className="max-w-screen-xl mx-auto px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ===== 왼쪽: 표지 ===== */}
            <div className="lg:col-span-4 flex flex-col items-center">
              {/* ✅ z-0으로 묶고 overflow-hidden 유지 */}
              <div className="relative z-0 w-[400px] h-[400px] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                {/* 흐릿한 배경 */}
                <img
                  src={Webtoon}
                  alt="blur background"
                  className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
                />
                {/* 중앙 선명한 원본 */}
                <img
                  src={Webtoon}
                  alt="main cover"
                  className="relative w-[250px] h-[350px] object-cover rounded-md shadow-lg"
                />
              </div>

              <div className="w-[320px] mt-5 text-sm text-gray-700 text-center">
                <p className="text-gray-600">
                  장르 | 자유 연재 | 1차 창작 카테고리
                </p>

                <div className="flex items-center justify-center gap-3 mt-2 text-gray-600">
                  <span>⭐ 4.4</span>
                  <span>👁 44</span>
                  <span>💬 4</span>
                  <span className="text-gray-400">연재 중</span>
                </div>

                <div className="flex justify-center gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-gray-200 rounded-md text-xs text-gray-800">
                    판타지
                  </span>
                  <span className="px-2 py-0.5 bg-gray-200 rounded-md text-xs text-gray-800">
                    로맨스
                  </span>
                  <span className="px-2 py-0.5 bg-gray-200 rounded-md text-xs text-gray-800">
                    웹소설
                  </span>
                </div>
              </div>
            </div>

            {/* ===== 오른쪽: 설명 + 회차 목록 ===== */}
            <div className="lg:col-span-8">
              {/* ✅ 완전 위로 끌어올림 + isolate로 blur 간섭 차단 */}
              <div className="relative z-[50] isolate rounded-xl shadow-lg overflow-hidden bg-black text-white">
                <div className="h-1 bg-yellow-400"></div>
                <div className="p-8 [&_*]:!text-white">
                  <p className="text-xs">웹소설</p>
                  <h2 className="text-3xl font-bold mt-1">작품명</h2>
                  <p className="text-sm mt-1">작가명</p>
                  <p className="mt-5 text-sm leading-relaxed">
                    작품 소개글 소개글 소개글 소개글 소개글 소개글 소개글 소개글 소개글
                    소개글 소개글 소개글 소개글 소개글 소개글 소개글 소개글 소개글 소개글.
                  </p>

                  {isError && (
                    <p className="mt-4 text-sm font-semibold !text-red-400">
                      ⚠ 데이터를 불러오지 못했습니다. 더미 데이터를 표시합니다.
                    </p>
                  )}

                  {/* ✅ 첫 화 보기 버튼 */}
                  <div className="mt-8">
                    <Link
                      to={`/episode/${episodes[0]?.id ?? 1}`}
                      className="inline-flex items-center justify-center rounded-md bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-8 py-3 transition-colors shadow-md"
                    >
                      첫 화 보기
                    </Link>
                  </div>
                </div>
              </div>

              {/* ===== 회차 목록 ===== */}
              <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="px-5 py-2 rounded-md bg-purple-600 text-white text-sm font-semibold">
                    회차
                  </button>
                  <button className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 text-sm">
                    유/무료
                  </button>
                </div>
                <div className="text-xs text-gray-600">
                  최신순 | 총 {episodes.length}화
                </div>
              </div>

              <ul className="mt-4 rounded-lg bg-white">
                {episodes.map((ep: Episode) => (
                  <li
                    key={ep.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-100 transition text-gray-800"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-gray-500">▷</span>
                      <div>
                        <p className="font-semibold text-gray-900">{ep.title}</p>
                        <p className="text-xs text-gray-600 mt-1 flex items-center gap-3">
                          <span>⭐ {ep.star}</span>
                          <span>👁 {ep.view}</span>
                          <span>💬 {ep.cmt}</span>
                          <span>{ep.date}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-yellow-500">
                      {ep.price}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkPage;
