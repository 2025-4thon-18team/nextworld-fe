import React from "react";
import { useNavigate } from "react-router-dom";

interface EditorTopBarProps {
  onLoad?: () => void;
  onSave?: () => void;
  onSubmit?: () => void;
}

const EditorTopBar: React.FC<EditorTopBarProps> = ({
  onLoad,
  onSave,
  onSubmit,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center border-b px-8 py-3 bg-white">
      {/* 왼쪽: 뒤로가기 */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-black text-xl"
        >
          ←
        </button>
      </div>

      {/* 오른쪽 버튼들 */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onLoad}
          className="border border-purple-300 text-purple-500 px-4 py-1.5 rounded-md hover:bg-purple-50"
        >
          불러오기
        </button>

        <button
          onClick={() => {
            if (onSave) onSave();
            navigate("/SettingPage");
          }}
          className="border border-gray-300 text-gray-600 px-4 py-1.5 rounded-md hover:bg-gray-50"
        >
          저장
        </button>

        <button
          onClick={onSubmit}
          className="bg-purple-500 text-white px-4 py-1.5 rounded-md hover:bg-purple-600"
        >
          정산하기
        </button>
      </div>
    </div>
  );
};

export default EditorTopBar;
