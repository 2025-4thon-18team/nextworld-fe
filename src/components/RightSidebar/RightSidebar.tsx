import { FC, ReactNode } from "react";
import { cn } from "@/utils";
import { IconCross } from "@/assets/icons";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { StickerCard } from "@/components/StickerCard/StickerCard";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { AddSeries } from "@/components/AddSeries/AddSeries";
import { IconPin } from "@/assets/icons";

type RightSidebarVariant =
  | "post-type"
  | "guide-line"
  | "universe-rule"
  | "payment-model";

interface RightSidebarProps {
  variant: RightSidebarVariant;
  title: string;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
}

// Post Type Variant Props
interface PostTypeProps {
  originalSelected?: boolean;
  onOriginalChange?: (selected: boolean) => void;
  series?: Array<{ imageUrl: string; title: string }>;
  onAddSeries?: () => void;
}

// Guide Line Variant Props
interface GuideLineProps {
  myWorkSelected?: boolean;
  onMyWorkChange?: (selected: boolean) => void;
  sections?: Array<{
    title: string;
    content: string;
  }>;
}

// Universe Rule Variant Props
interface UniverseRuleProps {
  myWorkSelected?: boolean;
  onMyWorkChange?: (selected: boolean) => void;
  content?: string;
}

// Payment Model Variant Props
interface PaymentModelProps {
  sections?: string[];
}

export const RightSidebar: FC<
  RightSidebarProps &
    Partial<
      PostTypeProps & GuideLineProps & UniverseRuleProps & PaymentModelProps
    >
> = ({
  variant,
  title,
  onClose,
  children,
  className,
  // Post Type props
  originalSelected = false,
  onOriginalChange,
  series = [],
  onAddSeries,
  // Guide Line props
  myWorkSelected = true,
  onMyWorkChange,
  sections = [],
  // Universe Rule props
  content,
  // Payment Model props
}) => {
  const renderContent = () => {
    switch (variant) {
      case "post-type":
        return (
          <div className="gap-md relative flex w-full shrink-0 flex-col items-center">
            <div className="relative flex w-374 shrink-0 items-center gap-2">
              <RadioButton
                selected={!originalSelected}
                onClick={() => onOriginalChange?.(false)}
              >
                오리지널
              </RadioButton>
              <RadioButton
                selected={originalSelected}
                onClick={() => onOriginalChange?.(true)}
              >
                2차 창작
              </RadioButton>
            </div>
            <div className="h-51 w-full shrink-0 rounded-md bg-[#f8c2c2]" />
            <div className="gap-lg relative flex w-full shrink-0 flex-wrap items-center justify-between px-24 py-0">
              {series.map((item, index) => (
                <SeriesCardSmall
                  key={index}
                  imageUrl={item.imageUrl}
                  title={item.title}
                />
              ))}
              <AddSeries onClick={onAddSeries} />
            </div>
          </div>
        );

      case "guide-line":
        return (
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
            <div className="relative flex w-full shrink-0 flex-col items-start gap-18">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-start gap-10"
                >
                  <div className="bg-secondary-100 relative flex w-full shrink-0 flex-col items-start gap-10 px-0 py-4">
                    <div className="relative flex shrink-0 items-center justify-center gap-3 px-4 py-0">
                      <IconPin className="relative flex size-24 shrink-0 items-center justify-center gap-10" />
                      <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
                        {section.title}
                      </p>
                    </div>
                  </div>
                  <StickerCard variant="primary">{section.content}</StickerCard>
                </div>
              ))}
            </div>
          </div>
        );

      case "universe-rule":
        return (
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
        );

      case "payment-model":
        return (
          <div className="gap-md relative flex w-full shrink-0 flex-col items-start">
            <div className="relative flex w-full shrink-0 items-start gap-10 bg-[#c3c3c3] p-10">
              <p className="text-body-medium w-312 tracking-tight text-black">
                공개 설정
              </p>
            </div>
            <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
              전채 공개
            </p>
            <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
              유료 공개
            </p>
            <div className="relative flex w-full shrink-0 items-start gap-10 bg-[#c3c3c3] p-10">
              <p className="text-body-medium w-312 tracking-tight text-black">
                가격 입력
              </p>
            </div>
            <div className="relative flex w-full shrink-0 items-start gap-10 bg-[#c3c3c3] p-10">
              <p className="text-body-medium w-312 tracking-tight text-black">
                정산 모델
              </p>
            </div>
          </div>
        );

      default:
        return children;
    }
  };

  return (
    <div
      className={cn(
        "bg-background-subtle flex h-890 items-start gap-10 px-32 py-24",
        variant === "payment-model" && "w-442",
        className,
      )}
    >
      <div className="gap-md relative flex w-374 shrink-0 flex-col items-start">
        {/* Header */}
        <div className="relative flex w-full shrink-0 items-center justify-between">
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

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};
