import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import DummyCover from "@/assets/dummycover.png"; // ✅ 로컬 이미지 import

interface Work {
  id: number;
  title: string;
  thumbnail: string;
  author: string;
  genre: string;
  views: number;
  likes: number;
  price: number;
  date: string;
  description: string;
}

const mockWorks: Work[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: "그녀가 웃던 마지막 봄날 2화",
  thumbnail: DummyCover,
  author: "작가명",
  genre: "로맨스",
  views: 44,
  likes: 4,
  price: 100,
  date: "2025.09.01",
  description:
    "피폐해진 세상 속, 그리고 그곳의 마지막 기억이었다. —너의 세상에 사랑이라 불리는 것, ‘마지막 봄날’을 맞이할 자격은 누가 있을까?",
}));

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"home" | "new" | "favorite">("home");
  const navigate = useNavigate(); // ✅ 추가

  const handleCardClick = (work: Work) => {
    navigate(`/WorkPage/${work.id}`, { state: work }); // ✅ 클릭 시 이동
  };

  const tabs: { key: "home" | "new" | "favorite"; label: string }[] = [
    { key: "home", label: "홈" },
    { key: "new", label: "신규" },
    { key: "favorite", label: "관심" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="mx-auto w-full max-w-screen-xl px-6 mt-8">
        {/* 🔹 상단 탭 */}
        <div className="flex space-x-6 border-b border-gray-200 mb-6 text-gray-600 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 ${
                activeTab === tab.key
                  ? "text-purple-600 border-b-2 border-purple-600 font-semibold"
                  : "hover:text-purple-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔹 탭 콘텐츠 */}
        <AnimatePresence mode="sync">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* 금주의 유니버스 */}
              <section className="mb-10">
                <h2 className="text-lg font-semibold mb-4">금주의 유니버스</h2>
                <div className="grid grid-cols-5 gap-6">
                  <div className="col-span-2">
                    <img
                      src={mockWorks[0].thumbnail}
                      alt={mockWorks[0].title}
                      className="rounded-lg shadow-md w-full h-[350px] object-cover"
                    />
                  </div>
                  <div className="col-span-3 grid grid-cols-2 gap-4">
                    {mockWorks.slice(0, 4).map((work) => (
                      <div
                        key={work.id}
                        onClick={() => handleCardClick(work)} // ✅ 클릭 이동
                        className="border rounded-lg p-4 hover:shadow-sm transition cursor-pointer"
                      >
                        <h3 className="font-medium text-sm mb-2 line-clamp-1">
                          {work.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                          {work.description}
                        </p>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>❤ {work.likes}</span>
                          <span>💬 {work.views}</span>
                          <span>{work.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 인기 작품 */}
              <section className="mb-10">
                <h2 className="text-lg font-semibold mb-4">인기 작품</h2>
                <div className="grid grid-cols-6 gap-4">
                  {mockWorks.map((work) => (
                    <div
                      key={work.id}
                      onClick={() => handleCardClick(work)} // ✅ 클릭 이동
                      className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                    >
                      <img
                        src={work.thumbnail}
                        alt={work.title}
                        className="h-56 w-full object-cover"
                      />
                      <div className="p-2 text-center text-sm">
                        <p className="font-medium">{work.genre}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 인기 포스트 */}
              <section>
                <h2 className="text-lg font-semibold mb-4">인기 포스트</h2>
                <div className="grid grid-cols-3 gap-4">
                  {mockWorks.slice(0, 6).map((work) => (
                    <div
                      key={work.id}
                      onClick={() => handleCardClick(work)} // ✅ 클릭 이동
                      className="border rounded-lg p-4 hover:shadow-sm transition cursor-pointer"
                    >
                      <h3 className="font-medium text-sm mb-2 line-clamp-1">
                        {work.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {work.description}
                      </p>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>❤ {work.likes}</span>
                        <span>💬 {work.views}</span>
                        <span>{work.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* 신규 탭 */}
          {activeTab === "new" && (
            <motion.div
              key="new"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {/* 신규 작품 */}
                <section>
                  <h2 className="text-lg font-semibold mb-4">신규 작품</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {mockWorks.map((work) => (
                      <img
                        key={work.id}
                        onClick={() => handleCardClick(work)} // ✅ 클릭 이동
                        src={work.thumbnail}
                        alt={work.title}
                        className="rounded-md shadow-sm hover:shadow-md transition cursor-pointer"
                      />
                    ))}
                  </div>
                </section>

                {/* 신규 포스트 */}
                <section>
                  <h2 className="text-lg font-semibold mb-4">신규 포스트</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {mockWorks.slice(0, 5).map((work) => (
                      <div
                        key={work.id}
                        onClick={() => handleCardClick(work)} // ✅ 클릭 이동
                        className="border rounded-lg p-4 hover:shadow-sm transition cursor-pointer"
                      >
                        <h3 className="font-medium text-sm mb-2">
                          {work.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                          {work.description}
                        </p>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>❤ {work.likes}</span>
                          <span>💬 {work.views}</span>
                          <span>{work.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {/* 관심 탭 */}
          {activeTab === "favorite" && (
            <motion.div
              key="favorite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <section className="mb-10">
                <h2 className="text-lg font-semibold mb-4">관심 작품</h2>
                <div className="grid grid-cols-4 gap-4">
                  {mockWorks.map((work) => (
                    <img
                      key={work.id}
                      onClick={() => handleCardClick(work)} // ✅ 클릭 이동
                      src={work.thumbnail}
                      alt={work.title}
                      className="rounded-md shadow-sm hover:shadow-md transition cursor-pointer"
                    />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-4">관심 포스트</h2>
                <div className="grid grid-cols-3 gap-4">
                  {mockWorks.slice(0, 5).map((work) => (
                    <div
                      key={work.id}
                      onClick={() => handleCardClick(work)} // ✅ 클릭 이동
                      className="border rounded-lg p-4 hover:shadow-sm transition cursor-pointer"
                    >
                      <h3 className="font-medium text-sm mb-2">
                        {work.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {work.description}
                      </p>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>❤ {work.likes}</span>
                        <span>💬 {work.views}</span>
                        <span>{work.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default HomePage;
