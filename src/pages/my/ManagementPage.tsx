import React from "react";
import Header from "@/components/Header";
import MySidebar from "@/components/MySidebar";
import { useNavigate } from "react-router-dom";
import DummyCover from "@/assets/dummycover.png";

const ManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const works = [
    { id: 1, title: "작품 제목", image: DummyCover },
    { id: 2, title: "작품 제목", image: DummyCover },
    { id: 3, title: "작품 제목", image: DummyCover },
    { id: 4, title: "작품 제목", image: DummyCover },
    { id: 5, title: "작품 제목", image: DummyCover },
    { id: 6, title: "작품 제목", image: DummyCover },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="mx-auto mt-10 flex w-full max-w-screen-xl flex-1 px-6">
        {/* ✅ 분리된 사이드바 */}
        <MySidebar point={2000} />

        {/* ===== 오른쪽 메인 영역 ===== */}
        <section className="ml-16 flex-1">
          {/* 작가 프로필 영역 */}
          <div className="mb-8 flex items-center space-x-6">
            <div className="h-20 w-20 rounded-full bg-gray-200" />
            <div>
              <p className="text-lg font-bold text-gray-900">[작가명]</p>
              <p className="mt-1 text-sm text-gray-600">
                안녕하세요 누구입니다! 안녕 나 누구 좋아한다..
              </p>
              <p className="mt-1 text-xs text-gray-400">
                자기 소개 50자, 0/100자
              </p>
            </div>
            <div className="ml-auto flex space-x-3">
              <button className="rounded-md border px-4 py-1 text-sm text-gray-700 hover:bg-gray-100">
                프로필 수정
              </button>
              <button className="rounded-md border px-4 py-1 text-sm text-gray-700 hover:bg-gray-100">
                로그아웃
              </button>
            </div>
          </div>

          {/* 탭 버튼 */}
          <div className="mb-8 flex space-x-2 border-b border-gray-200">
            <button className="border-b-2 border-purple-600 px-6 py-2 font-semibold text-purple-600">
              작품
            </button>
            <button className="px-6 py-2 text-gray-500 transition-colors hover:text-purple-500">
              포스트
            </button>
          </div>

          {/* 작품 리스트 */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {works.map((work) => (
              <div
                key={work.id}
                className="flex cursor-pointer flex-col items-center transition-transform hover:scale-105"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="h-52 w-36 rounded-md object-cover shadow"
                />
                <p className="mt-2 text-center text-sm">[{work.title}]</p>
              </div>
            ))}

            {/* 작품 추가 버튼 */}
            <div
              onClick={() => navigate("/WritingPage")}
              className="flex h-52 w-36 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-500 transition-colors hover:border-purple-400 hover:bg-gray-50"
            >
              <span className="mb-2 text-3xl">＋</span>
              <p className="text-sm">연재할 작품 추가하기</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagementPage;
