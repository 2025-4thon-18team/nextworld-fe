import { FC, ReactNode } from "react";
import Button from "@/components/Button/Button";
import { cn } from "@/utils";

interface StepNavigationButtonsViewProps {
  showPrevious?: boolean;
  previousLabel?: string;
  nextLabel: string;
  onPrevious?: () => void;
  onNext: () => void;
  className?: string;
  previousButtonClassName?: string;
  nextButtonClassName?: string;
  leftSpacer?: ReactNode;
}

export const StepNavigationButtonsView: FC<StepNavigationButtonsViewProps> = ({
  showPrevious = false,
  previousLabel = "이전 단계",
  nextLabel,
  onPrevious,
  onNext,
  className,
  previousButtonClassName,
  nextButtonClassName,
  leftSpacer,
}) => {
  return (
    <div className={cn("flex w-full items-center justify-center gap-12", className)}>
      {leftSpacer}
      {showPrevious && onPrevious && (
        <Button
          variant="subtle"
          className={cn("flex-1", previousButtonClassName)}
          onClick={onPrevious}
        >
          {previousLabel}
        </Button>
      )}
      <Button
        variant="default"
        className={cn("flex-1", nextButtonClassName)}
        onClick={onNext}
      >
        {nextLabel}
      </Button>
    </div>
  );
};

