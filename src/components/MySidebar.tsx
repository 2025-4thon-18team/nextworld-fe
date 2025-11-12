import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface MySidebarProps {
  point?: number;
}

const menuItems = [
  { name: "내 서재", path: "/StoragePage" },
  { name: "포인트", path: "/PointPage" },
  { name: "내 작품 관리", path: "/ManagementPage" },
  { name: "수익 현황", path: "/ProfitboardPage" },
];

const MySidebar: React.FC<MySidebarProps> = ({ point = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-1/5 min-w-[180px] border-r border-gray-200 pr-6 text-sm">
      {/* 포인트 */}
      <div className="mb-8">
        <p className="mb-2 text-gray-600">보유 포인트</p>
        <p className="text-lg font-semibold">{point.toLocaleString()} P</p>
      </div>

      {/* 메뉴 */}
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`text-left ${
                isActive
                  ? "font-semibold text-purple-600"
                  : "text-gray-600 hover:text-purple-500"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default MySidebar;
