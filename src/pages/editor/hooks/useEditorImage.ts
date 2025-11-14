import { useEffect } from "react";
import type { BlockType } from "../utils/blockUtils";

interface UseEditorImageProps {
  blocks: BlockType[];
  onInsertImage: (index: number, block: BlockType) => void;
}

/**
 * 이미지 삽입 로직 관리 훅
 * 전역 함수로 이미지 삽입 기능을 노출
 */
export const useEditorImage = ({
  blocks,
  onInsertImage,
}: UseEditorImageProps): void => {
  useEffect(() => {
    const handleInsertImage = (imageUrl: string) => {
      // 현재 포커스된 블록 찾기
      const activeElement = document.activeElement;
      let currentBlockId: number | null = null;

      if (activeElement && activeElement.id.startsWith("block-")) {
        currentBlockId = Number(activeElement.id.replace("block-", ""));
      }

      const newBlock: BlockType = {
        id: Date.now(),
        type: "image",
        src: imageUrl,
      };

      if (currentBlockId !== null) {
        // 현재 블록 뒤에 이미지 블록 추가
        const index = blocks.findIndex((b) => b.id === currentBlockId);
        onInsertImage(index + 1, newBlock);
      } else {
        // 끝에 이미지 블록 추가
        onInsertImage(blocks.length, newBlock);
      }
    };

    (
      window as Window & { __insertImageAtCursor?: (imageUrl: string) => void }
    ).__insertImageAtCursor = handleInsertImage;

    return () => {
      delete (
        window as Window & {
          __insertImageAtCursor?: (imageUrl: string) => void;
        }
      ).__insertImageAtCursor;
    };
  }, [blocks, onInsertImage]);
};
