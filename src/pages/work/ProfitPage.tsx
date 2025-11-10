// src/pages/work/ProfitPage.tsx
import React, { useState } from "react";
import Header from "@/components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/apis/axiosInstance";

const ProfitPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const workData = location.state || {};

  const [profitType, setProfitType] = useState<"free" | "paid">("free");
  const [price, setPrice] = useState("");
  const [royaltyRate, setRoyaltyRate] = useState("50");

  // ✅ 추가 항목
  const [allowSecondary, setAllowSecondary] = useState(true);
  const [allowPaidSecondary, setAllowPaidSecondary] = useState(true);
  const [guideline, setGuideline] = useState("");
  const [relatedTags, setRelatedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [agreeCopyright, setAgreeCopyright] = useState(false);
  const [confirmOwnership, setConfirmOwnership] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && newTag.trim() !== "") {
      setRelatedTags([...relatedTags, newTag.trim()]);
      setNewTag("");
      e.preventDefault();
    }
  };

  const handleSaveProfit = async () => {
    if (!agreeCopyright || !confirmOwnership) {
      alert("모든 항목에 동의해야 등록할 수 있습니다.");
      return;
    }
    try {
      const payload = {
        ...workData,
        profitType,
        price: profitType === "paid" ? Number(price) : 0,
        royaltyRate: Number(royaltyRate),
        allowSecondary,
        allowPaidSecondary,
        guideline,
        relatedTags,
      };
      await axiosInstance.post("/api/works/profit", payload);
      alert("작품 등록이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      <div className="max-w-6xl mx-auto p-10">
        <h2 className="text-xl font-semibold mb-8">작품 생성 중</h2>

        {/* ✅ grid 기반 레이아웃 적용 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 왼쪽 구역 */}
          <div className="lg:col-span-4 space-y-4 text-sm font-medium text-gray-600">
            <div className="space-y-2">
              <p className="text-purple-600 font-semibold">기본 정보 입력</p>
              <p>유니버스 정보 입력</p>
              <p className="font-semibold text-gray-900">수익 설정</p>
            </div>
          </div>

          {/* 오른쪽 구역 */}
          <div className="lg:col-span-8 space-y-8">
            {/* 수익 유형 */}
            <div>
              <label className="block font-semibold mb-3">수익 설정</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setProfitType("free")}
                  className={`px-5 py-2 rounded-md border text-sm transition ${
                    profitType === "free"
                      ? "bg-purple-500 text-white border-purple-500"
                      : "border-gray-300 text-gray-700 bg-white"
                  }`}
                >
                  무료
                </button>
                <button
                  onClick={() => setProfitType("paid")}
                  className={`px-5 py-2 rounded-md border text-sm transition ${
                    profitType === "paid"
                      ? "bg-purple-500 text-white border-purple-500"
                      : "border-gray-300 text-gray-700 bg-white"
                  }`}
                >
                  유료
                </button>
              </div>

              {profitType === "paid" && (
                <div className="mt-4">
                  <label className="block text-sm mb-1">가격 (원)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="예: 1000"
                    className="border border-gray-300 rounded-md p-2 w-40 text-sm"
                  />
                </div>
              )}
            </div>

            {/* 저작권 수익 배분 */}
            <div>
              <label className="block font-semibold mb-3">
                저작권 수익 배분 비율 (%)
              </label>
              <input
                type="number"
                value={royaltyRate}
                onChange={(e) => setRoyaltyRate(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-40 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                예: 50 → 작가 50%, 플랫폼 50%
              </p>
            </div>

            {/* 2차 창작 설정 */}
            <div className="border-t pt-6">
              <label className="block font-semibold mb-4">2차 창작 허용</label>

              <div className="flex items-center justify-between mb-4">
                <span>2차 창작 허용</span>
                <input
                  type="checkbox"
                  checked={allowSecondary}
                  onChange={(e) => setAllowSecondary(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <span>2차 창작물의 수익 허용</span>
                <input
                  type="checkbox"
                  checked={allowPaidSecondary}
                  onChange={(e) => setAllowPaidSecondary(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  2차 창작 가이드라인
                </label>
                <textarea
                  value={guideline}
                  onChange={(e) => setGuideline(e.target.value)}
                  placeholder="2차 창작자가 지켜야 할 내용을 자유롭게 작성하세요."
                  className="w-full border border-gray-300 rounded-md p-3 text-sm h-32 resize-none"
                />
              </div>
            </div>

            {/* 태그 */}
            <div>
              <label className="block font-semibold mb-3">태그</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {relatedTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="태그 입력 후 스페이스바를 눌러주세요"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
              />
            </div>

            {/* 동의 체크박스 */}
            <div className="space-y-3 mt-8 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreeCopyright}
                  onChange={(e) => setAgreeCopyright(e.target.checked)}
                />
                저작권 관련 정책을 모두 이해하고 동의합니다.
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={confirmOwnership}
                  onChange={(e) => setConfirmOwnership(e.target.checked)}
                />
                제출된 내용이 본인의 창작물임을 확인합니다.
              </label>
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-between mt-10">
              <button
                onClick={() => navigate(-1)}
                className="w-1/3 py-3 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                이전 단계
              </button>
              <button
                onClick={handleSaveProfit}
                className="w-1/3 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                완료하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitPage;
