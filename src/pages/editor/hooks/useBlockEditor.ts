import { useState, useCallback, useRef, useEffect } from "react";
import type { BlockType } from "../utils/blockUtils";
import { parseContentToBlocks, blocksToHtml } from "../utils/blockUtils";

interface UseBlockEditorProps {
  initialContent: string;
  onContentChange: (html: string) => void;
}

interface UseBlockEditorReturn {
  blocks: BlockType[];
  setBlocks: (blocks: BlockType[]) => void;
  updateBlock: (id: number, updates: Partial<BlockType>) => void;
  insertBlock: (index: number, block: BlockType) => void;
  removeBlock: (id: number) => void;
  addBlock: (block: BlockType) => void;
  handleBlockInput: (id: number, html: string) => void;
  handleBlockKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: number,
  ) => void;
}

/**
 * 블록 에디터 상태 및 로직 관리 훅
 */
export const useBlockEditor = ({
  initialContent,
  onContentChange,
}: UseBlockEditorProps): UseBlockEditorReturn => {
  const [blocks, setBlocks] = useState<BlockType[]>(() =>
    parseContentToBlocks(initialContent),
  );
  const isInternalUpdate = useRef(false);

  // content가 외부에서 변경되면 블록 업데이트
  useEffect(() => {
    if (!isInternalUpdate.current) {
      const parsed = parseContentToBlocks(initialContent);
      setBlocks(parsed);
    }
    isInternalUpdate.current = false;
  }, [initialContent]);

  // 블록 변경 시 HTML로 변환하여 부모에 전달
  const syncBlocksToContent = useCallback(
    (newBlocks: BlockType[]) => {
      setBlocks(newBlocks);
      isInternalUpdate.current = true;
      const html = blocksToHtml(newBlocks);
      onContentChange(html);
    },
    [onContentChange],
  );

  // 블록 업데이트
  const updateBlock = useCallback(
    (id: number, updates: Partial<BlockType>) => {
      syncBlocksToContent(
        blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
      );
    },
    [blocks, syncBlocksToContent],
  );

  // 블록 삽입
  const insertBlock = useCallback(
    (index: number, block: BlockType) => {
      const updated = [...blocks];
      updated.splice(index, 0, block);
      syncBlocksToContent(updated);
    },
    [blocks, syncBlocksToContent],
  );

  // 블록 제거
  const removeBlock = useCallback(
    (id: number) => {
      syncBlocksToContent(blocks.filter((b) => b.id !== id));
    },
    [blocks, syncBlocksToContent],
  );

  // 블록 추가
  const addBlock = useCallback(
    (block: BlockType) => {
      syncBlocksToContent([...blocks, block]);
    },
    [blocks, syncBlocksToContent],
  );

  // 블록 입력 처리
  const handleBlockInput = useCallback(
    (id: number, html: string) => {
      updateBlock(id, { html });
    },
    [updateBlock],
  );

  // 블록 키 입력 처리
  const handleBlockKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, id: number) => {
      // Shift+Enter → <br>
      if (e.key === "Enter" && e.shiftKey) {
        document.execCommand("insertHTML", false, "<br>");
        e.preventDefault();
        return;
      }

      // Enter → 새 블록 생성
      if (e.key === "Enter") {
        e.preventDefault();
        const newBlock: BlockType = {
          id: Date.now(),
          type: "text",
          html: "",
        };

        const index = blocks.findIndex((b) => b.id === id);
        insertBlock(index + 1, newBlock);

        // 새 블록에 포커스
        setTimeout(() => {
          const nextBlock = document.getElementById(`block-${newBlock.id}`);
          if (nextBlock) {
            nextBlock.focus();
            // 커서를 블록 시작 위치로 이동
            const range = document.createRange();
            range.selectNodeContents(nextBlock);
            range.collapse(true);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }, 0);
      }
    },
    [blocks, insertBlock],
  );

  // 블록 배열을 직접 설정 (드래그 앤 드롭 등에서 사용)
  const setBlocksCallback = useCallback(
    (newBlocks: BlockType[]) => {
      syncBlocksToContent(newBlocks);
    },
    [syncBlocksToContent],
  );

  return {
    blocks,
    setBlocks: setBlocksCallback,
    updateBlock,
    insertBlock,
    removeBlock,
    addBlock,
    handleBlockInput,
    handleBlockKeyDown,
  };
};
