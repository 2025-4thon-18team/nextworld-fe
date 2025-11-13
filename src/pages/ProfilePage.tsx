import React, { useState, ChangeEvent } from "react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");

  // 이미지 업로드
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = () => {
    // TODO: API 연동
    console.log({
      profileImage,
      name,
      bio,
      email,
      twitter,
    });

    alert("저장되었습니다.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="mx-auto w-full max-w-screen-lg px-6 py-10">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-sm text-gray-600 hover:text-black"
        >
          <span className="mr-1">←</span> 프로필 수정
        </button>

        <h2 className="mb-10 text-2xl font-semibold">프로필 이미지</h2>

        {/* 프로필 이미지 + 업로드 버튼 */}
        <div className="flex items-center gap-6 mb-10">
          {/* 이미지 미리보기 원형 */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300" />
            )}
          </div>

          {/* 파일 업로드 */}
          <label className="flex items-center w-80 h-10 border border-gray-300 rounded-lg px-3 text-gray-400 cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageChange} />
            파일을 선택해주세요.
          </label>

          <label className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageChange} />
            파일 선택
          </label>
        </div>

        {/* 이름 입력 */}
        <div className="mb-8">
          <label className="block mb-2 font-medium">
            이름 <span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            placeholder="김나경"
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="mt-2 text-xs text-gray-400">1자 이상 20자 이내</p>
        </div>

        {/* 자기소개 */}
        <div className="mb-10">
          <label className="block mb-2 font-medium">자기소개</label>
          <textarea
            placeholder="자기소개를 입력해주세요."
            className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none"
            maxLength={200}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <p className="mt-2 text-xs text-gray-400">200자 이내</p>
        </div>

        {/* 소셜 정보 */}
        <div className="mb-10">
          <h3 className="mb-4 font-medium">소셜 정보</h3>

          {/* 이메일 */}
          <div className="flex items-center gap-3 mb-4">
            <FaTwitter className="text-xl text-gray-600" />
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              className="flex-1 h-11 px-3 border border-gray-300 rounded-lg focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 트위터 */}
          <div className="flex items-center gap-3">
            <FaTwitter className="text-xl text-gray-600" />
            <input
              type="text"
              placeholder="Twitter 계정을 입력해주세요."
              className="flex-1 h-11 px-3 border border-gray-300 rounded-lg focus:outline-none"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-48 h-12 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition"
          >
            변경 내용 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
