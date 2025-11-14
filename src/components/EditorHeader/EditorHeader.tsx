import { FC } from "react";
import { cn } from "@/utils";
import { IconChevron, IconPicture } from "@/assets/icons";
import { EditorOptions } from "@/components/EditorOptions/EditorOptions";
import { ButtonSmall } from "@/components/ButtonSmall/ButtonSmall";

interface EditorHeaderProps {
  onBack?: () => void;
  onLoad?: () => void;
  onSave?: () => void;
  onSettle?: () => void;
  onAddImage?: () => void;
  editorOptionsVariant?: "post" | "series" | "post-with-settlement";
  seriesTitle?: string;
  onPostClick?: () => void;
  onGuidelineClick?: () => void;
  className?: string;
  isPublishing?: boolean;
  showPublish?: boolean;
  showGuideline?: boolean;
}

export const EditorHeader: FC<EditorHeaderProps> = ({
  onBack,
  onLoad,
  onSave,
  onSettle,
  onAddImage,
  editorOptionsVariant = "post-with-settlement",
  seriesTitle,
  onPostClick,
  onGuidelineClick,
  className,
  isPublishing = false,
  showPublish = true,
  showGuideline = true,
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      {/* Top Bar */}
      <div className="relative flex w-full max-w-1280 shrink-0 items-center justify-between overflow-hidden px-80 py-10">
        <button
          type="button"
          onClick={onBack}
          className="relative flex shrink-0 items-center p-10"
        >
          <IconChevron className="size-24 shrink-0 overflow-hidden" />
        </button>
        <div className="gap-lg relative flex shrink-0 items-center">
          {onLoad && (
            <ButtonSmall variant="subtle" onClick={onLoad}>
              불러오기
            </ButtonSmall>
          )}
          {onSave && (
            <ButtonSmall variant="subtle" onClick={onSave}>
              저장
            </ButtonSmall>
          )}
          {
            <ButtonSmall
              variant="default"
              onClick={onSettle}
              disabled={isPublishing || !showPublish}
            >
              {isPublishing ? "발행 중..." : "발행하기"}
            </ButtonSmall>
          }
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-b-sm border-grayscale-g2 py-lg relative flex h-84 w-full max-w-1280 shrink-0 items-center justify-between px-80">
        <button
          type="button"
          onClick={onAddImage}
          className="gap-xs relative flex shrink-0 flex-col items-center justify-center px-12 py-0"
        >
          <IconPicture className="relative flex size-24 shrink-0 items-center justify-center gap-10" />
          <p className="text-body-medium text-center tracking-tight text-nowrap whitespace-pre text-black">
            이미지 추가
          </p>
        </button>
        <EditorOptions
          variant={editorOptionsVariant}
          seriesTitle={seriesTitle}
          onPostClick={onPostClick}
          onGuidelineClick={showGuideline ? onGuidelineClick : undefined}
        />
      </div>
    </div>
  );
};
