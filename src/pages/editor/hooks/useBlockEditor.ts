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
      const currentBlock = blocks.find((b) => b.id === id);
      const currentIndex = blocks.findIndex((b) => b.id === id);
      const isEmpty = !currentBlock?.html || currentBlock.html.trim() === "" || currentBlock.html === "<br>" || currentBlock.html === "<p><br></p>";

      // Backspace 처리: 빈 블록에서 백스페이스를 누르면 이전 블록으로 이동하거나 블록 삭제
      if (e.key === "Backspace" && isEmpty) {
        e.preventDefault();
        
        // 첫 번째 블록이 아니면 이전 블록으로 이동
        if (currentIndex > 0) {
          const prevBlock = blocks[currentIndex - 1];
          const prevBlockElement = document.getElementById(`block-${prevBlock.id}`);
          if (prevBlockElement) {
            prevBlockElement.focus();
            // 커서를 이전 블록의 끝으로 이동
            const range = document.createRange();
            range.selectNodeContents(prevBlockElement);
            range.collapse(false);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
          // 현재 빈 블록 삭제
          removeBlock(id);
        }
        return;
      }

      // Shift+Enter → <br>
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        document.execCommand("insertHTML", false, "<br>");
        return;
      }

      // Enter → 새 블록 생성
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        
        const currentBlockElement = document.getElementById(`block-${id}`);
        if (!currentBlockElement) return;
        
        // contentEditable이 자동으로 추가한 요소 제거
        const children = Array.from(currentBlockElement.childNodes);
        children.forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            const el = child as HTMLElement;
            if (el.tagName === "P" || el.tagName === "BR" || el.tagName === "DIV") {
              // 요소의 내용을 텍스트 노드로 변환
              const textContent = el.textContent || "";
              const textNode = document.createTextNode(textContent);
              currentBlockElement.replaceChild(textNode, el);
            }
          }
        });
        
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        
        const range = selection.getRangeAt(0);
        
        // 현재 블록의 텍스트 내용 가져오기
        const currentText = currentBlockElement.textContent || "";
        const cursorPosition = range.startOffset;
        
        // 커서 앞의 텍스트와 뒤의 텍스트 분리
        const beforeText = currentText.substring(0, cursorPosition);
        const afterText = currentText.substring(cursorPosition);
        
        // 현재 블록 업데이트 (커서 앞의 내용만)
        updateBlock(id, { html: beforeText });
        
        // 새 블록 생성 (커서 뒤의 내용)
        const newBlock: BlockType = {
          id: Date.now(),
          type: "text",
          html: afterText,
        };
        insertBlock(currentIndex + 1, newBlock);

        // 새 블록에 포커스 (약간의 지연을 두어 DOM 업데이트 완료 대기)
        setTimeout(() => {
          const nextBlock = document.getElementById(`block-${newBlock.id}`);
          if (nextBlock) {
            // contentEditable이 자동으로 추가한 요소 제거
            const nextChildren = Array.from(nextBlock.childNodes);
            nextChildren.forEach((child) => {
              if (child.nodeType === Node.ELEMENT_NODE) {
                const el = child as HTMLElement;
                if (el.tagName === "P" || el.tagName === "BR" || el.tagName === "DIV") {
                  const textContent = el.textContent || "";
                  const textNode = document.createTextNode(textContent);
                  nextBlock.replaceChild(textNode, el);
                }
              }
            });
            
            nextBlock.focus();
            // 커서를 새 블록 시작 위치로 이동
            const newRange = document.createRange();
            newRange.selectNodeContents(nextBlock);
            newRange.collapse(true);
            const newSelection = window.getSelection();
            if (newSelection) {
              newSelection.removeAllRanges();
              newSelection.addRange(newRange);
            }
          }
        }, 0);
      }
    },
    [blocks, insertBlock, removeBlock, updateBlock],
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
