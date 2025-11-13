// src/pages/CompletePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const CompletePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex flex-1">
        {/* 왼쪽 단계 표시 */}
        <aside className="w-[200px] flex flex-col items-center mt-20 text-sm">
          <div className="flex flex-col items-center">
            <span className="text-purple-600 font-semibold">기본 설정</span>
            <span className="text-gray-400 text-xl">⌵</span>

            <span className="text-gray-600 mt-2">유니버스 설정</span>
            <span className="text-gray-400 text-xl">⌵</span>

            <span className="text-gray-600 mt-2">2차 창작 설정</span>
          </div>
        </aside>

        {/* 중앙 메시지 */}
        <main className="flex flex-1 flex-col justify-center items-center text-center">
          <p className="text-xl font-semibold mb-2">작품 생성 완료</p>
          <p className="text-lg text-gray-600">에디터로 이동</p>
        </main>
      </div>

      {/* 하단 버튼 */}
      <footer className="flex justify-center gap-6 mb-12">
        <button
          onClick={() => navigate(-1)}
          className="w-[300px] py-3 border border-purple-300 rounded-xl text-purple-600 font-medium hover:bg-purple-50 transition"
        >
          이전 단계
        </button>

        <button
          onClick={() => navigate("/HomePage")}
          className="w-[300px] py-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition"
        >
          완료하기
        </button>
      </footer>
    </div>
  );
};

export default CompletePage;
