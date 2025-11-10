import { useState } from "react";
import { Link } from "react-router-dom";

function TestPage() {
  const [count, setCount] = useState(0);

  const words = [
    { text: "Vite", className: "text-[#a95eff]" },
    { text: " + " },
    { text: "React", className: "text-[#61dafb]" },
    { text: " + " },
    { text: "Tailwindcss", className: "text-[#0ea5e9]" },
    { text: " + " },
    { text: "Framer Motion", className: "text-[#ff57c8]" },
  ];

  const pages = [
    {
      category: "마이페이지",
      routes: [
        { path: "/my-page/main", label: "마이페이지 메인" },
        { path: "/my-page/library", label: "내 서재" },
        { path: "/my-page/revenue", label: "수익 현황" },
        { path: "/my-page/point", label: "포인트 내역" },
      ],
    },
    {
      category: "작품 생성",
      routes: [
        { path: "/create-series/basic", label: "작품 생성 - 기본 정보" },
        { path: "/create-series/universe", label: "작품 생성 - 유니버스 정보" },
      ],
    },
    {
      category: "인증",
      routes: [
        { path: "/login", label: "로그인" },
        { path: "/signup", label: "회원가입" },
      ],
    },
    {
      category: "기타",
      routes: [{ path: "/viewer", label: "뷰어" }],
    },
  ];

  return (
    <div className="text-center">
      <header className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#282c34] pb-8 text-white">
        {/* Page Navigation */}
        <div className="mt-8 w-full max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-white">
            페이지 네비게이션
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pages.map((section) => (
              <div
                key={section.category}
                className="rounded-lg bg-[#1e2228] p-4"
              >
                <h3 className="mb-3 text-lg font-semibold text-[#61dafb]">
                  {section.category}
                </h3>
                <div className="flex flex-col gap-2">
                  {section.routes.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      className="rounded-md bg-[#2d3238] px-4 py-2 text-sm text-white transition-all hover:bg-[#3d4248] hover:text-[#61dafb]"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default TestPage;
