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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && inputTag.trim() !== "") {
      e.preventDefault();
      setTags((prev) => [...prev, inputTag.trim()]);
      setInputTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      days: selectedDays,
      genres: selectedGenres,
      tags,
      coverImage,
    };

    try {
      await axiosInstance.post("/api/works", payload);
      navigate("/ProfitPage");
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Header />

      {/* 💡 Header에 가려지는 문제 방지 */}
      <div className="absolute inset-0 pointer-events-none z-0" />

      {/* 컨텐츠 시작 */}
      <main className="relative z-10 pointer-events-auto max-w-6xl mx-auto p-10 pt-24">
        <h2 className="text-xl font-semibold mb-10">작품 생성 중</h2>

        {/* 🔹 전체를 grid로 분리 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 왼쪽 구역 */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {/* 표지 이미지 */}
            <div>
              <label className="block font-medium mb-2">표지 이미지 *</label>
              <div className="flex flex-col items-start space-y-3">
                <div className="w-40 h-56 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="cover"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400">프리셋</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 rounded-md text-sm"
                />
              </div>
            </div>

            {/* 연재일 */}
            <div>
              <label className="block font-medium mb-2">연재일 *</label>
              <div className="flex flex-wrap gap-2">
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      selectedDays.includes(day)
                        ? "bg-purple-500 text-white border-purple-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* 장르 */}
            <div>
              <label className="block font-medium mb-2">장르 카테고리 *</label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      selectedGenres.includes(genre)
                        ? "bg-purple-500 text-white border-purple-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽 구역 */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            {/* 제목 */}
            <div>
              <label className="block font-medium mb-2">제목 *</label>
              <input
                type="text"
                placeholder="작품 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-md p-3"
              />
            </div>

            {/* 작품 설명 */}
            <div>
              <label className="block font-medium mb-2">작품 설명 *</label>
              <textarea
                placeholder="작품에 대한 간단한 소개를 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-md p-3 h-40 resize-none"
              />
            </div>

            {/* 태그 */}
            <div>
              <label className="block font-medium mb-2">태그</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 text-sm"
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
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* 다음 단계 버튼 */}
            <div className="flex justify-end pt-6">
              <button
                onClick={handleSubmit}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-md transition-colors"
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
