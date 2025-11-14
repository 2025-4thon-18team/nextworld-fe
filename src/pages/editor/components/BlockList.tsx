import { FC } from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import type { BlockType } from "../utils/blockUtils";
import { BlockEditor } from "./BlockEditor";

interface BlockListProps {
  blocks: BlockType[];
  draggingId: number | null;
  onBlockInput: (id: number, html: string) => void;
  onBlockKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, id: number) => void;
  onDragStart: (id: number, e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDragEnd: () => void;
}

/**
 * 블록 리스트 컴포넌트
 * 드래그 앤 드롭 및 블록 렌더링 담당
 */
export const BlockList: FC<BlockListProps> = ({
  blocks,
  draggingId,
  onBlockInput,
  onBlockKeyDown,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => {
  return (
    <div className="min-h-600 w-full">
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          layout
          className="group relative mb-4 flex items-start gap-3"
          style={{
            opacity: draggingId === block.id ? 0.5 : 1,
          }}
          onDragOver={(e) => onDragOver(e, block.id)}
          onDrop={(e) => e.preventDefault()}
        >
          {/* Drag Handle */}
          <div
            className="shrink-0 cursor-grab p-1 opacity-0 transition-opacity select-none group-hover:opacity-100 active:cursor-grabbing"
            style={{ marginTop: "2px" }}
            draggable
            onDragStart={(e) => onDragStart(block.id, e)}
            onDragEnd={onDragEnd}
          >
            <GripVertical className="text-grayscale-g4 size-20 select-none" />
          </div>

          {/* Block Content */}
          {block.type === "text" ? (
            <BlockEditor
              id={block.id}
              html={block.html || ""}
              isFirstBlock={blocks.findIndex((b) => b.id === block.id) === 0}
              onInput={onBlockInput}
              onKeyDown={onBlockKeyDown}
            />
          ) : (
            <img
              src={block.src}
              alt=""
              className="border-grayscale-g2 my-4 h-auto max-w-full rounded-xl border"
              style={{ display: "block" }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
