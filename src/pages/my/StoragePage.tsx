import React, { useState } from "react";
import Header from "@/components/Header";
import MySidebar from "@/components/MySidebar";
import { useNavigate } from "react-router-dom";

const Storage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"works" | "posts">("works");
  const navigate = useNavigate();

  // ✅ 구매한 작품 더미데이터
  const purchasedWorks = Array(6).fill({
    id: 1,
    title: "작품 제목",
    cover:
      "https://i.pinimg.com/564x/26/ea/ea/26eaea7d82e51455ff3eaf26d542c2a4.jpg",
  });

  // ✅ 구매한 포스트 더미데이터
  const purchasedPosts = [
    {
      id: 1,
      title: "그녀가 웃던 마지막 봄날 2화",
      content:
        "차창밖에서 봄 내음이 불어왔다. 그리고 그녀도 마지막이었다 — 나의 세 번째 사랑의 시작이었던 이별. ‘이번엔 제발 축복해주세요.’",
      price: 100,
      tags: ["로맨스", "감성글"],
      rating: 4.4,
      likes: 44,
      views: 44,
      date: "2025.10.01",
    },
    {
      id: 2,
      title: "그녀가 웃던 마지막 봄날 2화",
      content:
        "차창밖에서 봄 내음이 불어왔다. 그리고 그녀도 마지막이었다 — 나의 세 번째 사랑의 시작이었던 이별. ‘이번엔 제발 축복해주세요.’",
      price: 100,
      tags: ["로맨스", "감성글"],
      rating: 4.4,
      likes: 44,
      views: 44,
      date: "2025.10.01",
    },
  ];

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

          {/* ✅ 작품 리스트 */}
          {activeTab === "works" ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {purchasedWorks.map((work, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/WorkPage/${work.id}`)}
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
            /* ✅ 구매한 포스트 리스트 */
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {purchasedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/PostPage/${post.id}`)}
                  className="relative cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* 상단 제목 + 포인트 */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-[15px] leading-snug font-semibold text-gray-900">
                      {post.title}
                    </h3>
                    <span className="ml-2 text-sm font-semibold text-yellow-600">
                      {post.price} P
                    </span>
                  </div>

                  {/* 내용 미리보기 */}
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {post.content}
                  </p>

                  {/* 태그 */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* 하단 정보 */}
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-3">
                      <span>⭐ {post.rating}</span>
                      <span>💬 {post.likes}</span>
                      <span>👁 {post.views}</span>
                    </div>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Storage;
