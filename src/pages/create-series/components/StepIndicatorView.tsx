import { FC } from "react";
import { IconChevron } from "@/assets/icons";
import { cn } from "@/utils";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

interface StepIndicatorViewProps {
  activeStep: StepType;
  onStepChange: (step: StepType) => void;
  className?: string;
}

export const StepIndicatorView: FC<StepIndicatorViewProps> = ({
  activeStep,
  onStepChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "gap-xs flex flex-col items-center justify-center",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => onStepChange("기본 설정")}
          className={cn(
            "text-headings-heading-4",
            activeStep === "기본 설정"
              ? "text-foreground-default"
              : "text-black",
          )}
        >
          기본 설정
        </button>
        <IconChevron className="size-24 rotate-270" />
        <button
          type="button"
          onClick={() => onStepChange("유니버스 설정")}
          className={cn(
            "text-body-regular",
            activeStep === "유니버스 설정"
              ? "text-foreground-default"
              : "text-black",
          )}
        >
          유니버스 설정
        </button>
        <IconChevron className="size-24 rotate-270" />
        <button
          type="button"
          onClick={() => onStepChange("2차 창작 설정")}
          className={cn(
            "text-body-regular",
            activeStep === "2차 창작 설정"
              ? "text-foreground-default"
              : "text-black",
          )}
        >
          2차 창작 설정
        </button>
      </div>
    </div>
  );
};
