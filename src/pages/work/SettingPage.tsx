import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/apis/axiosInstance";

const genres = ["판타지", "로맨스", "스릴러"];
const days = ["월", "화", "수", "목", "금", "토", "일", "비정기연재"];

const WritingPage: React.FC = () => {
  const navigate = useNavigate();

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");

  // ✅ 표지 이미지 업로드
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ 연재일 선택
  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  // ✅ 장르 선택
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  // ✅ 태그 입력
  const handleTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && inputTag.trim() !== "") {
      e.preventDefault();
      setTags((prev) => [...prev, inputTag.trim()]);
      setInputTag("");
    }
  };

  // ✅ 태그 삭제
  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  // ✅ 다음 단계
  const handleSubmit = async () => {
    console.log("✅ 버튼 클릭됨");

    const payload = { title, description, selectedDays, selectedGenres, tags };

    try {
      await axiosInstance.post("/works", payload);
      navigate("/work/UniversePage"); // ⭐ 변경된 라우팅 경로
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Header />

      <main className="relative z-10 mx-auto max-w-6xl p-10 pt-24">
        <h2 className="mb-10 text-xl font-semibold">작품 생성 중</h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* 왼쪽 ---------------------------------------------------------------- */}
          <div className="flex flex-col space-y-6 lg:col-span-4">
            {/* 표지 이미지 */}
            <div>
              <label className="mb-2 block font-medium">표지 이미지 *</label>
              <div className="flex flex-col items-start space-y-3">
                <div className="flex h-56 w-40 items-center justify-center overflow-hidden rounded-md bg-gray-200">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="cover"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">프리셋</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="rounded-md border p-2 text-sm"
                />
              </div>
            </div>

            {/* 연재일 */}
            <div>
              <label className="mb-2 block font-medium">연재일 *</label>
              <div className="flex flex-wrap gap-2">
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`rounded-full border px-3 py-1 text-sm ${
                      selectedDays.includes(day)
                        ? "border-purple-500 bg-purple-500 text-white"
                        : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* 장르 */}
            <div>
              <label className="mb-2 block font-medium">장르 카테고리 *</label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`rounded-full border px-3 py-1 text-sm ${
                      selectedGenres.includes(genre)
                        ? "border-purple-500 bg-purple-500 text-white"
                        : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽 --------------------------------------------------------------- */}
          <div className="flex flex-col space-y-6 lg:col-span-8">
            {/* 제목 */}
            <div>
              <label className="mb-2 block font-medium">제목 *</label>
              <input
                type="text"
                placeholder="작품 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border p-3"
              />
            </div>

            {/* 설명 */}
            <div>
              <label className="mb-2 block font-medium">작품 설명 *</label>
              <textarea
                placeholder="작품에 대한 간단한 소개를 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-40 w-full resize-none rounded-md border p-3"
              />
            </div>

            {/* 태그 */}
            <div>
              <label className="mb-2 block font-medium">태그</label>
              <div className="mb-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center space-x-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="태그 입력 후 스페이스바"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyDown={handleTagInput}
                className="w-full rounded-md border p-2"
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md bg-purple-500 px-8 py-3 text-white transition-colors hover:bg-purple-600"
              >
                다음 단계
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WritingPage;
