import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import ProfileIcon from "@/assets/profile.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (
      e.currentTarget.elements.namedItem("search") as HTMLInputElement
    ).value;
    console.log("검색어:", query);
    // 실제 검색 페이지로 이동하려면 아래 사용
    // navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-8 py-3">
        {/* 왼쪽: 로고 + 차세계 */}
        <div
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="차세계 로고" className="h-10 w-10" />
          <span className="text-xl font-bold text-gray-800">차세계</span>
        </div>

        {/* 가운데 + 오른쪽: 검색창 + 글쓰기 + 프로필 */}
        <div className="ml-auto flex items-center gap-3">
          {/* 검색창 */}
          <form onSubmit={handleSearch} className="h-[40px] w-[400px]">
            <input
              type="text"
              name="search"
              placeholder="검색어를 입력하세요"
              className="h-full w-full rounded-full border px-4 text-sm focus:ring-2 focus:ring-purple-300 focus:outline-none"
            />
          </form>

          {/* 오른쪽: 글쓰기 + 프로필 */}
          <div className="flex items-center space-x-4">
            <Link
              to="/WritingPage"
              className="rounded-md bg-purple-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600"
            >
              글 쓰기
            </Link>

            <Link to="/ProfilePage">
              <img
                src={ProfileIcon}
                alt="프로필"
                className="h-10 w-10 cursor-pointer rounded-full transition-transform hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
