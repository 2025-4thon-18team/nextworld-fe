// src/components/Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import ProfileIcon from "@/assets/profile.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    console.log("검색어:", query);
    // 실제 검색 페이지로 이동하려면 아래 사용
    // navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 py-3">
        {/* 왼쪽: 로고 + 차세계 */}
        <div
          className="flex items-center cursor-pointer space-x-2"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="차세계 로고" className="w-20 h-20" />
          <span className="text-xl font-bold text-gray-800">차세계</span>
        </div>

        {/* 가운데: 검색창 */}
        <form onSubmit={handleSearch} className="ml-auto w-400 h-20">
          <input
            type="text"
            name="search"
            placeholder="검색어를 입력하세요"
            className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </form>

        {/* 오른쪽: 글쓰기 + 프로필 */}
        <div className="flex items-center space-x-4">
          <Link
            to="/WritingPage"
            className="bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
          >
            글 쓰기
          </Link>

          <Link to="/ProfilePage">
            <img
              src={ProfileIcon}
              alt="프로필"
              className="w-20 h-20 rounded-full hover:scale-110 transition-transform cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
