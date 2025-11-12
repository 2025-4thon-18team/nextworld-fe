import React, { useState } from "react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const UniversePage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedCover, setSelectedCover] = useState<number | null>(0);
  const [title, setTitle] = useState("asdafsf");
  const [description, setDescription] = useState([
    "placeholder",
    "placeholder",
  ]);
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState("");

  const handleNext = () => {
    navigate("/ProfitPage", {
      state: { title, selectedCover, description, isPaid, price },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex flex-1">
        {/* 왼쪽: 단계 네비게이션 */}
        <aside className="w-64 border-r border-gray-200 p-6">
          <ul className="space-y-2 text-gray-600">
            <li className="font-semibold text-purple-600">기본 정보 입력</li>
            <li>유니버스 정보 입력</li>
            <li>수익 설정</li>
          </ul>
        </aside>

        {/* 중앙 콘텐츠 */}
        <section className="flex-1 p-10">
          <h2 className="mb-6 text-xl font-semibold">유니버스 설정</h2>

          {/* 검색 */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="작품 제목 입력"
            className="mb-6 w-full rounded-md border border-gray-300 p-2"
          />

          {/* 표지 이미지 선택 */}
          <div className="mb-6 grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                onClick={() => setSelectedCover(i)}
                className={`cursor-pointer overflow-hidden rounded-md border-2 ${
                  selectedCover === i
                    ? "border-purple-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src="https://via.placeholder.com/200x300"
                  alt={`cover ${i}`}
                  className="h-48 w-full object-cover"
                />
                <p
                  className={`py-2 text-center text-sm ${
                    selectedCover === i
                      ? "font-medium text-purple-600"
                      : "text-gray-500"
                  }`}
                >
                  [작품 제목]
                </p>
              </div>
            ))}
          </div>

          {/* 설명 */}
          <div className="mb-6 space-y-2">
            <textarea
              placeholder="placeholder"
              value={description[0]}
              onChange={(e) => setDescription([e.target.value, description[1]])}
              className="h-24 w-full rounded-md border p-2"
            />
            <textarea
              placeholder="placeholder"
              value={description[1]}
              onChange={(e) => setDescription([description[0], e.target.value])}
              className="h-24 w-full rounded-md border p-2"
            />
          </div>

          {/* 유/무료 여부 */}
          <div className="mb-4 flex items-center space-x-2">
            <label className="font-medium">유료/무료 연재여부</label>
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
              className="toggle-checkbox"
            />
          </div>

          {/* 가격 입력 */}
          <div className="mb-6">
            <label className="mb-1 block text-sm text-gray-600">
              회차 가격 입력
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="placeholder"
              className="w-full rounded-md border p-2"
            />
            <p className="mt-1 text-xs text-gray-500">
              권당이 있을 경우, 청산 비율은 4:3:3으로 고정됩니다.
            </p>
          </div>

          {/* 버튼 */}
          <div className="mt-10 flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="rounded-md border border-purple-400 px-6 py-2 text-purple-600 transition-colors hover:bg-purple-50"
            >
              이전 단계
            </button>
            <button
              onClick={handleNext}
              className="rounded-md bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
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
