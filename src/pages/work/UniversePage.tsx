import React, { useState } from "react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const UniversePage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedCover, setSelectedCover] = useState<number | null>(0);
  const [title, setTitle] = useState("asdafsf");

  // 🔥 원작 설정 ON/OFF
  const [isOriginal, setIsOriginal] = useState(false);

  // 🔥 유료 연재 여부 ON/OFF
  const [isPaid, setIsPaid] = useState(false);

  const [price, setPrice] = useState("");

  const handleNext = () => {
    navigate("/ProfitPage", {
      state: {
        title,
        selectedCover,
        isOriginal,
        isPaid,
        price,
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex flex-1">
        {/* 좌측 단계 메뉴 */}
        <aside className="w-64 border-r border-gray-200 px-6 py-10">
          <ul className="space-y-4 text-sm">
            <li className="font-semibold text-purple-600">기본 설정</li>
            <li className="text-gray-500">유니버스 설정</li>
            <li className="text-gray-500">2차 창작 설정</li>
          </ul>
        </aside>

        {/* 중앙 콘텐츠 */}
        <section className="flex-1 px-[80px] py-10">
          <h2 className="mb-6 text-xl font-semibold">유니버스 설정</h2>

          {/* ===========================  
              원작 설정 ON/OFF
          ============================ */}
          <div className="mb-8 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">원작 설정</span>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isOriginal}
                onChange={(e) => setIsOriginal(e.target.checked)}
                className="peer sr-only"
              />
              <div
                className="peer h-6 w-11 rounded-full bg-gray-300 transition-all 
                peer-checked:bg-purple-500
                after:absolute after:left-1 after:top-1 after:h-4 after:w-4 
                after:rounded-full after:bg-white after:transition-all
                peer-checked:after:translate-x-5"
              ></div>
            </label>
          </div>

          {/* ===========================  
              검색창 + 카드 목록 (원작 설정 ON일 때만)
          ============================ */}
          {isOriginal && (
            <>
              {/* 검색창 */}
              <div className="relative mb-8">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="검색어를 입력하세요"
                  className="w-full rounded-full border border-gray-300 py-2 pl-12 pr-6 text-sm shadow-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* 표지 이미지 선택 */}
              <div className="mb-8 grid grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedCover(i)}
                    className={`cursor-pointer overflow-hidden rounded-md border ${
                      selectedCover === i
                        ? "border-purple-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src="https://i.pinimg.com/564x/26/ea/ea/26eaea7d82e51455ff3eaf26d542c2a4.jpg"
                      alt={`cover-${i}`}
                      className="h-48 w-full object-cover"
                    />
                    <p
                      className={`py-2 text-center text-sm ${
                        selectedCover === i
                          ? "text-purple-600 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      [작품 제목]
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ===========================  
              유료 연재 여부
          ============================ */}
          <div className="mb-4 flex items-center justify-between">
            <p className="font-medium text-sm text-gray-600">유료 연재 여부</p>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="peer sr-only"
              />
              <div
                className="peer h-6 w-11 rounded-full bg-gray-300 transition-all 
                peer-checked:bg-purple-500
                after:absolute after:left-1 after:top-1 after:h-4 after:w-4 
                after:rounded-full after:bg-white after:transition-all
                peer-checked:after:translate-x-5"
              ></div>
            </label>
          </div>

          {/* 가격 입력 — 유료 설정일 때만 표시 */}
          {isPaid && (
            <div className="mb-10">
              <label className="block mb-1 text-sm text-gray-600">
                회차 가격 입력 *
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="placeholder"
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-purple-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                원작이 있을 경우, 정산 비율은 4:3:3으로 고정됩니다.
              </p>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex justify-between pt-6">
            <button
              onClick={() => navigate(-1)}
              className="w-[180px] rounded-md border border-purple-400 py-2 text-center text-purple-600 transition hover:bg-purple-50"
            >
              이전 단계
            </button>

            <button
              onClick={handleNext}
              className="w-[180px] rounded-md bg-purple-600 py-2 text-white transition hover:bg-purple-700"
            >
              다음 단계
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UniversePage;
