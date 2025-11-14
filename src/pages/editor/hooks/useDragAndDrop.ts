import { useState, useCallback } from "react";
import type { BlockType } from "../utils/blockUtils";

interface UseDragAndDropProps {
  blocks: BlockType[];
  onBlocksChange: (blocks: BlockType[]) => void;
}

interface UseDragAndDropReturn {
  draggingId: number | null;
  handleDragStart: (id: number, e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  handleDragEnd: () => void;
}

/**
 * 블록 드래그 앤 드롭 로직 관리 훅
 */
export const useDragAndDrop = ({
  blocks,
  onBlocksChange,
}: UseDragAndDropProps): UseDragAndDropReturn => {
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleDragStart = useCallback(
    (id: number, e: React.DragEvent<HTMLDivElement>) => {
      setDraggingId(id);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(id));
    },
    [],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: number) => {
      e.preventDefault();
      if (draggingId === null || draggingId === id) return;

      const targetEl = document.getElementById(`block-${id}`);
      if (!targetEl) return;

      const rect = targetEl.getBoundingClientRect();
      const isBelowHalf = e.clientY > rect.top + rect.height / 2;

      const draggedIdx = blocks.findIndex((b) => b.id === draggingId);
      const targetIdx = blocks.findIndex((b) => b.id === id);

      if (draggedIdx === -1 || targetIdx === -1) return;
      if (draggedIdx === targetIdx) return;

      const items = [...blocks];
      const [dragged] = items.splice(draggedIdx, 1);
      const newIndex = isBelowHalf ? targetIdx + 1 : targetIdx;
      const insertIndex = newIndex > draggedIdx ? newIndex - 1 : newIndex;
      items.splice(insertIndex, 0, dragged);

      onBlocksChange(items);
    },
    [draggingId, blocks, onBlocksChange],
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
  }, []);

  return {
    draggingId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
