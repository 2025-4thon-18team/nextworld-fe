import { FC } from "react";
import { BlockList } from "./BlockList";
import type { BlockType } from "../utils/blockUtils";

interface EditorBodyProps {
  title: string;
  blocks: BlockType[];
  draggingId: number | null;
  onTitleChange: (value: string) => void;
  onBlockInput: (id: number, html: string) => void;
  onBlockKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, id: number) => void;
  onDragStart: (id: number, e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDragEnd: () => void;
}

/**
 * 에디터 본문 영역 컴포넌트
 * 제목 입력 및 블록 리스트를 포함
 */
export const EditorBody: FC<EditorBodyProps> = ({
  title,
  blocks,
  draggingId,
  onTitleChange,
  onBlockInput,
  onBlockKeyDown,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => {
  return (
    <div className="relative flex h-full w-890 shrink-0 flex-col gap-10 bg-white px-60 pt-40">
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="제목"
        className="text-headings-heading-2 h-fit w-full bg-transparent tracking-tight text-black outline-none placeholder:text-black"
      />
      <div className="h-0 w-full border-t border-black" />

      {/* Blocks Editor */}
      <BlockList
        blocks={blocks}
        draggingId={draggingId}
        onBlockInput={onBlockInput}
        onBlockKeyDown={onBlockKeyDown}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      />
    </div>
  );
};
