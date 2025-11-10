import React, { useState } from "react";
import Header from "@/components/Header";
import MySidebar from "@/components/MySidebar";

const Storage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"works" | "posts">("works");

  const purchasedWorks = Array(6).fill({
    id: 1,
    title: "작품 제목",
    cover:
      "https://i.pinimg.com/564x/26/ea/ea/26eaea7d82e51455ff3eaf26d542c2a4.jpg",
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="mx-auto mt-10 flex w-full max-w-screen-xl flex-1 px-6">
        {/* ✅ 분리된 사이드바 */}
        <MySidebar point={2000} />

        {/* 메인 컨텐츠 */}
        <section className="flex-1 pl-10">
          <h2 className="mb-6 text-lg font-semibold">내 서재</h2>

          {/* 탭 */}
          <div className="mb-8 flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("works")}
              className={`px-6 py-2 font-medium ${
                activeTab === "works"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              구매한 작품
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-6 py-2 font-medium ${
                activeTab === "posts"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              구매한 포스트
            </button>
          </div>

          {/* 작품 리스트 */}
          {activeTab === "works" ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {purchasedWorks.map((work, idx) => (
                <div
                  key={idx}
                  className="flex cursor-pointer flex-col items-center transition-transform hover:scale-105"
                >
                  <img
                    src={work.cover}
                    alt={work.title}
                    className="h-52 w-36 rounded-md object-cover shadow-sm"
                  />
                  <p className="mt-2 text-sm text-gray-700">[{work.title}]</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 text-sm text-gray-400">
              구매한 포스트가 없습니다.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Storage;
