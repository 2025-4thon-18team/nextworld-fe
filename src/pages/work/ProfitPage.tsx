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

  // 추가 항목
  const [allowSecondary, setAllowSecondary] = useState(true);
  const [allowPaidSecondary, setAllowPaidSecondary] = useState(true);
  const [guideline, setGuideline] = useState("");
  const [relatedTags, setRelatedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [agreeCopyright, setAgreeCopyright] = useState(false);
  const [confirmOwnership, setConfirmOwnership] = useState(false);

  /** ⛳ 스페이스바 입력 시 태그 생성 */
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && newTag.trim() !== "") {
      if (!relatedTags.includes(newTag.trim())) {
        setRelatedTags([...relatedTags, newTag.trim()]);
      }
      setNewTag("");
      e.preventDefault();
    }
  };

  /** ⛳ 태그 클릭 시 삭제 */
  const handleRemoveTag = (target: string) => {
    setRelatedTags((prev) => prev.filter((tag) => tag !== target));
  };

  /** 저장 */
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

      // ✅ FinishPage 로 이동하도록 수정
      navigate("/FinishPage");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      <div className="mx-auto max-w-6xl p-10">
        <h2 className="mb-8 text-xl font-semibold">작품 생성 중</h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* 좌측 메뉴 */}
          <div className="space-y-4 text-sm font-medium text-gray-600 lg:col-span-4">
            <div className="space-y-2">
              <p className="font-semibold text-purple-600">기본 정보 입력</p>
              <p>유니버스 정보 입력</p>
              <p className="font-semibold text-gray-900">수익 설정</p>
            </div>
          </div>

          {/* 우측 내용 */}
          <div className="space-y-8 lg:col-span-8">
            {/* 수익 유형 */}
            <div>
              <label className="mb-3 block font-semibold">수익 설정</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setProfitType("free")}
                  className={`rounded-md border px-5 py-2 text-sm transition ${
                    profitType === "free"
                      ? "border-purple-500 bg-purple-500 text-white"
                      : "border-gray-300 bg-white text-gray-700"
                  }`}
                >
                  무료
                </button>

                <button
                  onClick={() => setProfitType("paid")}
                  className={`rounded-md border px-5 py-2 text-sm transition ${
                    profitType === "paid"
                      ? "border-purple-500 bg-purple-500 text-white"
                      : "border-gray-300 bg-white text-gray-700"
                  }`}
                >
                  유료
                </button>
              </div>

              {profitType === "paid" && (
                <div className="mt-4">
                  <label className="mb-1 block text-sm">가격 (원)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="예: 1000"
                    className="w-40 rounded-md border border-gray-300 p-2 text-sm"
                  />
                </div>
              )}
            </div>

            {/* 저작권 수익 배분 */}
            <div>
              <label className="mb-3 block font-semibold">
                저작권 수익 배분 비율 (%)
              </label>
              <input
                type="number"
                value={royaltyRate}
                onChange={(e) => setRoyaltyRate(e.target.value)}
                className="w-40 rounded-md border border-gray-300 p-2 text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">
                예: 50 → 작가 50%, 플랫폼 50%
              </p>
            </div>

            {/* 2차 창작 설정 */}
            <div className="border-t pt-6">
              <label className="mb-4 block font-semibold">2차 창작 허용</label>

              <div className="mb-4 flex items-center justify-between">
                <span>2차 창작 허용</span>
                <input
                  type="checkbox"
                  checked={allowSecondary}
                  onChange={(e) => setAllowSecondary(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <span>2차 창작물의 수익 허용</span>
                <input
                  type="checkbox"
                  checked={allowPaidSecondary}
                  onChange={(e) => setAllowPaidSecondary(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  2차 창작 가이드라인
                </label>
                <textarea
                  value={guideline}
                  onChange={(e) => setGuideline(e.target.value)}
                  placeholder="2차 창작자가 지켜야 할 내용을 자유롭게 작성하세요."
                  className="h-32 w-full resize-none rounded-md border border-gray-300 p-3 text-sm"
                />
              </div>
            </div>

            {/* 태그 입력 */}
            <div>
              <label className="mb-3 block font-semibold">태그</label>

              {/* 생성된 태그들 */}
              <div className="mb-2 flex flex-wrap gap-2">
                {relatedTags.map((tag, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleRemoveTag(tag)}
                    className="cursor-pointer rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700 hover:bg-purple-200"
                    title="클릭하여 삭제"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 입력창 */}
              <input
                type="text"
                placeholder="태그 입력 후 스페이스바를 눌러주세요"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
              />
            </div>

            {/* 동의 체크박스 */}
            <div className="mt-8 space-y-3 text-sm">
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

            {/* 버튼 */}
            <div className="mt-10 flex justify-between">
              <button
                onClick={() => navigate(-1)}
                className="w-1/3 rounded-md border border-gray-300 py-3 hover:bg-gray-100"
              >
                이전 단계
              </button>

              <button
                onClick={handleSaveProfit}
                className="w-1/3 rounded-md bg-purple-500 py-3 text-white hover:bg-purple-600"
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
