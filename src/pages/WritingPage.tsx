import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import EditorTopBar from "@/components/EditorTopBar";
import WarningIcon from "@/assets/warning.png"; // ⭐ 추가: warning 아이콘

const Editor1stPostPage: React.FC = () => {
  const [uploadType, setUploadType] = useState<"post" | "series">("post");
  const [isOriginal, setIsOriginal] = useState(false);
  const [isPaidPost, setIsPaidPost] = useState(false);
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>(["현대로맨스"]);
  const [tagInput, setTagInput] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const mockWorks = [
    {
      id: 1,
      title: "악녀는 공애뿐",
      thumbnail:
        "https://image.yes24.com/goods/117118811/XL",
    },
    {
      id: 2,
      title: "악녀는 공애뿐2",
      thumbnail:
        "https://image.yes24.com/goods/117118811/XL",
    },
  ];

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(" ")) {
      const newTag = value.trim();
      if (newTag.length > 0) setTags((prev) => [...prev, newTag]);
      setTagInput("");
    } else {
      setTagInput(value);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setPrice(onlyNumbers);
  };

  const handleSave = () => {};

  return (
    <div className="h-screen w-full bg-white flex flex-col">
      <EditorTopBar
        onLoad={() => alert("불러오기 기능 준비중")}
        onSave={handleSave}
        onSubmit={() => alert("정산하기 기능 준비중")}
      />

      <div className="flex flex-1">
        {/* 왼쪽 */}
        <aside className="w-[240px] border-r bg-gray-50 flex flex-col items-center justify-start p-4">
          <button className="flex flex-col items-center mt-10 text-gray-600 hover:text-black transition">
            <span className="text-2xl mb-2">🖼️</span>
            <span className="text-sm font-medium">이미지 추가</span>
          </button>
        </aside>

        {/* 중앙 */}
        <main className="flex-1 flex flex-col border-r">
          <div className="flex flex-col p-8 space-y-8 overflow-y-auto">
            <div>
              <label className="block text-base font-semibold mb-2">제목</label>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-b border-gray-200 focus:outline-none focus:border-purple-500 pb-2 text-lg"
              />
            </div>

            <div>
              <label className="block text-base font-semibold mb-2">본문</label>
              <textarea
                placeholder="본문을 입력하세요"
                rows={15}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-4 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>
        </main>

        {/* 오른쪽 패널 */}
        <aside className="w-[320px] p-6 bg-gray-50 flex flex-col">

          {/* 상단 제목 + 가이드라인 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-gray-700">
              {uploadType === "post" ? "포스트" : "작품"}
            </h2>

            {isOriginal && (
              <div className="flex items-center gap-1 text-sm text-purple-600 cursor-pointer">
                <img src={WarningIcon} className="w-4" />
                <span>가이드라인</span>
              </div>
            )}

            <button className="text-gray-400 hover:text-black text-lg">✕</button>
          </div>

          {/* 탭 */}
          <div className="flex border-b mb-6">
            <button
              className={`flex-1 text-center py-2 font-semibold ${
                uploadType === "post"
                  ? "border-b-2 border-purple-500 text-purple-600"
                  : "text-gray-400"
              }`}
              onClick={() => setUploadType("post")}
            >
              포스트
            </button>

            <button
              className={`flex-1 text-center py-2 font-semibold ${
                uploadType === "series"
                  ? "border-b-2 border-purple-500 text-purple-600"
                  : "text-gray-400"
              }`}
              onClick={() => setUploadType("series")}
            >
              작품 연재
            </button>
          </div>

          {/* 설정 영역 */}
          <div className="space-y-6">

            {/* 원작 설정 → POST에서만 표시 */}
            {uploadType === "post" && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">원작 설정</span>
                <Switch
                  checked={isOriginal}
                  onChange={setIsOriginal}
                  className={`${
                    isOriginal ? "bg-purple-500" : "bg-gray-300"
                  } relative inline-flex h-5 w-10 items-center rounded-full transition`}
                >
                  <span
                    className={`${
                      isOriginal ? "translate-x-5" : "translate-x-1"
                    } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
            )}

            {/* 원작 설정 선택 시 원작 리스트 */}
            {uploadType === "post" && isOriginal && (
              <div>
                <input
                  type="text"
                  placeholder="원작 검색"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                />

                <div className="grid grid-cols-2 gap-2 mt-3">
                  {mockWorks.map((w) => (
                    <div
                      key={w.id}
                      className="rounded-md border cursor-pointer overflow-hidden"
                    >
                      <img src={w.thumbnail} className="w-full h-32 object-cover" />
                      <p className="text-center text-xs py-1">{w.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 작품 연재 탭일 때 */}
            {uploadType === "series" && (
              <div>
                <p className="text-gray-700 text-sm mb-2">작품 선택</p>

                <div className="grid grid-cols-2 gap-2">
                  {mockWorks.map((w) => (
                    <div
                      key={w.id}
                      className="rounded-md border cursor-pointer overflow-hidden"
                    >
                      <img src={w.thumbnail} className="w-full h-32 object-cover" />
                      <p className="text-center text-xs py-1">{w.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 유료 포스트 */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">유료 포스트</span>
              <Switch
                checked={isPaidPost}
                onChange={setIsPaidPost}
                className={`${
                  isPaidPost ? "bg-purple-500" : "bg-gray-300"
                } relative inline-flex h-5 w-10 items-center rounded-full transition`}
              >
                <span
                  className={`${
                    isPaidPost ? "translate-x-5" : "translate-x-1"
                  } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            {/* ⭐ 회차 가격 → 유료 포스트인 경우에만 렌더링 */}
            {isPaidPost && (
              <div>
                <label className="block text-gray-700 mb-2">회차 가격 입력</label>
                <input
                  type="text"
                  placeholder="0"
                  value={price}
                  onChange={handlePriceChange}
                  className="w-full border border-gray-200 rounded-md p-2 text-sm"
                />

                {price && (
                  <p className="text-sm text-purple-600 mt-1">{price} P</p>
                )}

                <p className="text-xs text-gray-400 mt-1">
                  정산 비율은 4(원작자) : 3(플랫폼) : 3(작가)으로 고정됩니다
                </p>
              </div>
            )}

            {/* 태그 */}
            <div>
              <label className="block text-gray-700 mb-2">태그</label>
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInput}
                placeholder="태그 입력 후 띄어쓰기"
                className="w-full border border-gray-200 rounded-md p-2 text-sm mb-2"
              />

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(i)}
                      className="ml-2 text-gray-400 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
};

export default Editor1stPostPage;
