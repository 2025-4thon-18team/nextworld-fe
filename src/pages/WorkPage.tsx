import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "@/components/Header";
import DummyCover from "@/assets/dummycover.png";

const WorkPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const workData = location.state || {
    title: "작품명",
    author: "작가명",
    description:
      "작품 설명이 여기에 들어갑니다. 세계관, 줄거리, 주요 인물의 특징 등을 요약하는 영역입니다.",
    thumbnail: DummyCover,
    rating: 4.9,
    views: 2100,
    likes: 44,
    date: "2025.11.09",
  };

  // ✅ 탭 상태 관리
  const [activeTab, setActiveTab] = useState<"episodes" | "universe">("episodes");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="max-w-screen-xl mx-auto mt-8 px-6">
        {/* ===== 상단: 표지 + 작품 정보 ===== */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* 썸네일 */}
          <div className="flex-shrink-0">
            <img
              src={workData.thumbnail}
              alt={workData.title}
              className="w-60 h-80 rounded-lg shadow-md object-cover"
            />

            {/* 평점, 조회수, 좋아요 */}
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                ⭐ {workData.rating} | 👁 {workData.views} | 💬 {workData.likes}
              </p>
              <p className="text-gray-400 mt-1">{workData.date}</p>
            </div>

            {/* 태그 */}
            <div className="flex justify-center gap-2 mt-3 text-xs text-gray-600">
              <span className="px-2 py-0.5 bg-gray-100 rounded-md">판타지</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded-md">로맨스</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded-md">웹소설</span>
            </div>

            {/* 버튼 아이콘 영역 */}
            <div className="flex justify-center gap-10 mt-6 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div>💗</div>
                <div>33</div>
              </div>
              <div className="flex flex-col items-center">
                <div>⭐</div>
                <div>관심</div>
              </div>
              <div className="flex flex-col items-center">
                <div>🔗</div>
                <div>공유</div>
              </div>
            </div>
          </div>

          {/* 작품 상세 정보 */}
          <div className="flex-1 bg-gray-100 rounded-xl p-8 shadow-sm">
            <p className="text-sm text-gray-400 mb-1">유니버스명</p>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              {workData.title}
            </h1>
            <p className="text-gray-600 mb-4">작가 | {workData.author}</p>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              {workData.description}
            </p>

            <button className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition">
              첫 화 보기
            </button>
          </div>
        </div>

        {/* ===== 탭 버튼 ===== */}
        <div className="mt-10 flex border-b">
          <button
            className={`px-6 py-3 font-semibold ${
              activeTab === "episodes"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("episodes")}
          >
            회차
          </button>
          <button
            className={`px-6 py-3 font-semibold ${
              activeTab === "universe"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("universe")}
          >
            유니버스
          </button>
        </div>

        {/* ===== 탭 내용 ===== */}
        {activeTab === "episodes" ? (
          <section className="mt-6">
            {/* 회차 리스트 */}
            <div className="border rounded-lg divide-y">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-4 px-6 text-sm hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {i + 1}화 - 더미 에피소드 제목
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ⭐ 4.{i + 1} | 👁 {100 + i * 20} | 💬 {i * 2} | 2025.11.{9 + i}
                    </p>
                  </div>
                  <p className="text-yellow-500 font-semibold text-sm">
                    {i % 2 === 0 ? "무료" : "100 P"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-10 space-y-10">
            {/* 인기 유니버스 작품 */}
            <div>
              <h2 className="text-lg font-semibold mb-4">인기 유니버스 작품</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={DummyCover}
                      alt="cover"
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-semibold">[작품명] {i + 1}</p>
                    <p className="text-xs text-gray-500">작가명</p>
                    <p className="text-xs text-yellow-500 mt-1">100 P</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 인기 포스트 */}
            <div>
              <h2 className="text-lg font-semibold mb-4">인기 포스트</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <p className="font-semibold text-gray-800">
                      그녀가 웃던 마지막 봄날 {i + 1}화
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      작품의 주요 장면에 대한 팬 포스트 내용이 들어갑니다.
                    </p>
                    <div className="flex gap-3 text-xs text-gray-500 mt-2">
                      <span>⭐ 4.{i + 3}</span>
                      <span>👁 {200 + i * 30}</span>
                      <span>💬 {i * 5}</span>
                      <span>2025.11.{8 + i}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default WorkPage;
