import { FC, useRef, useEffect } from "react";

interface BlockEditorProps {
  id: number;
  html: string;
  onInput: (id: number, html: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, id: number) => void;
}

/**
 * 개별 블록 에디터 컴포넌트
 */
export const BlockEditor: FC<BlockEditorProps> = ({
  id,
  html,
  onInput,
  onKeyDown,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const isInternalUpdate = useRef(false);

  // html이 외부에서 변경되면 업데이트
  useEffect(() => {
    if (!isInternalUpdate.current && blockRef.current) {
      blockRef.current.innerHTML = html;
    }
    isInternalUpdate.current = false;
  }, [html]);

  return (
    <div
      id={`block-${id}`}
      ref={blockRef}
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => {
        isInternalUpdate.current = true;
        onInput(id, (e.target as HTMLDivElement).innerHTML);
      }}
      onKeyDown={(e) => onKeyDown(e, id)}
      className="text-body-regular min-h-[24px] w-full bg-transparent tracking-tight text-black outline-none empty:before:text-black empty:before:opacity-50 empty:before:content-[attr(data-placeholder)] focus:outline-none"
      data-placeholder="본문"
    />
  );
};
