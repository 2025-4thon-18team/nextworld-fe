import { FC } from "react";
import { cn } from "@/utils";
import { IconCross } from "@/assets/icons";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { StickerCard } from "@/components/StickerCard/StickerCard";

interface UniverseSidebarProps {
  title: string;
  onClose?: () => void;
  myWorkSelected?: boolean;
  onMyWorkChange?: (selected: boolean) => void;
  content?: string;
  className?: string;
}

export const UniverseSidebar: FC<UniverseSidebarProps> = ({
  title,
  onClose,
  myWorkSelected = true,
  onMyWorkChange,
  content,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-background-subtle flex h-890 items-start gap-10 shadow-[-2px_1px_4px_0px_rgba(0,0,0,0.25)] w-374",
        className,
      )}
    >
      <div className="flex flex-col gap-8 grow shrink-0 min-h-px min-w-px px-32 py-0 relative w-full">
        {/* Header */}
        <div className="bg-white flex flex-col gap-md items-start pb-md pt-lg px-32 relative shrink-0 w-full">
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
              {title}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex size-24 items-center justify-center overflow-hidden"
            >
              <IconCross className="size-24 shrink-0 overflow-hidden" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-lg grow shrink-0 min-h-px min-w-px px-32 py-0 relative w-full">
          <div className="gap-md relative flex w-full shrink-0 flex-col items-start">
            <div className="relative flex w-full shrink-0 items-center gap-2">
              <RadioButton
                selected={myWorkSelected}
                onClick={() => onMyWorkChange?.(true)}
              >
                내 작품
              </RadioButton>
              <RadioButton
                selected={!myWorkSelected}
                onClick={() => onMyWorkChange?.(false)}
              >
                원작
              </RadioButton>
            </div>
            {content && (
              <div className="relative flex w-full shrink-0 flex-col items-start gap-18">
                <StickerCard variant="secondary">{content}</StickerCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

