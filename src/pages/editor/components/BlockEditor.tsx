import { FC, useRef, useEffect } from "react";

interface BlockEditorProps {
  id: number;
  html: string;
  isFirstBlock?: boolean;
  onInput: (id: number, html: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, id: number) => void;
}

/**
 * 개별 블록 에디터 컴포넌트
 */
export const BlockEditor: FC<BlockEditorProps> = ({
  id,
  html,
  isFirstBlock = false,
  onInput,
  onKeyDown,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const isInternalUpdate = useRef(false);

  // html이 외부에서 변경되면 업데이트
  useEffect(() => {
    if (!isInternalUpdate.current && blockRef.current) {
      // contentEditable이 자동으로 추가하는 <p> 태그 방지
      if (html && html.trim() !== "") {
        blockRef.current.textContent = html;
      } else {
        blockRef.current.textContent = "";
      }
    }
    isInternalUpdate.current = false;
  }, [html]);

  // 빈 블록인지 확인
  const isEmpty =
    !html || html.trim() === "" || html === "<br>" || html === "<p><br></p>";

  return (
    <div
      id={`block-${id}`}
      ref={blockRef}
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => {
        isInternalUpdate.current = true;
        const target = e.target as HTMLDivElement;
        // 텍스트만 추출 (contentEditable이 자동으로 추가하는 <p> 태그 무시)
        const content = target.textContent || "";
        onInput(id, content);
      }}
      onKeyDown={(e) => onKeyDown(e, id)}
      className={`text-body-regular min-h-[24px] w-full bg-transparent tracking-tight text-black outline-none focus:outline-none ${
        isEmpty && isFirstBlock
          ? "empty:before:text-black empty:before:opacity-50 empty:before:content-[attr(data-placeholder)]"
          : ""
      }`}
      data-placeholder="본문"
    />
  );
};
