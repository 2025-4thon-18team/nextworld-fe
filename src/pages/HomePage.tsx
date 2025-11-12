import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Webtoon from "@/assets/dummycover.png";

const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 상단 네비게이션 (공용 컴포넌트) */}
      <Header />

      {/* ✅ 메인 콘텐츠 */}
      <main className="flex-1 flex justify-center items-start mt-10 px-6">
        <div className="flex space-x-6">
          {/* 클릭 시 작품 상세페이지로 이동 */}
          <Link to="/WorkPage">
            <img
              src={Webtoon}
              alt="작품 이미지"
              className="w-207 h-300 object-cover rounded-md shadow-md hover:scale-105 transition-transform"
            />
          </Link>
          <Link to="/WorkPage">
            <img
              src={Webtoon}
              alt="작품 이미지"
              className="w-207 h-300 object-cover rounded-md shadow-md hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
