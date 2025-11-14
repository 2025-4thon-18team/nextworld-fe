import { FC } from "react";
import { cn } from "@/utils";
import {
  IconPost,
  IconSeries,
  IconWarning,
} from "@/assets/icons";
import IconWithLabel from "@/components/IconWithLabel/IconWithLabel";

type EditorOptionsVariant =
  | "post"
  | "series"
  | "post-with-settlement"
  | "series-with-guide";

interface EditorOptionsProps {
  variant?: EditorOptionsVariant;
  seriesTitle?: string;
  onPostClick?: () => void;
  onGuidelineClick?: () => void;
  className?: string;
}

export const EditorOptions: FC<EditorOptionsProps> = ({
  variant = "post",
  seriesTitle = "[작품 제목]",
  onPostClick,
  onGuidelineClick,
  className,
}) => {
  if (variant === "series") {
    return (
      <div className={cn("flex items-center", className)}>
        <IconWithLabel
          icon={<IconSeries className="size-24 shrink-0 overflow-hidden" />}
          label={seriesTitle}
        />
        <IconWithLabel
          icon={<IconWarning className="size-24 shrink-0 overflow-hidden" />}
          label="가이드라인"
          onClick={onGuidelineClick}
        />
      </div>
    );
  }

  if (variant === "series-with-guide") {
    return (
      <div className={cn("flex items-center", className)}>
        <IconWithLabel
          icon={<IconSeries className="size-24 shrink-0 overflow-hidden" />}
          label={seriesTitle}
        />
        <IconWithLabel
          icon={<IconWarning className="size-24 shrink-0 overflow-hidden" />}
          label="가이드라인"
          onClick={onGuidelineClick}
        />
      </div>
    );
  }

  if (variant === "post-with-settlement") {
    return (
      <div className={cn("flex items-center", className)}>
        <IconWithLabel
          icon={<IconPost className="size-24 shrink-0 overflow-hidden" />}
          label="포스트"
          onClick={onPostClick}
        />
        {onGuidelineClick && (
          <IconWithLabel
            icon={<IconWarning className="size-24 shrink-0 overflow-hidden" />}
            label="가이드라인"
            onClick={onGuidelineClick}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <IconWithLabel
        icon={<IconPost className="size-24 shrink-0 overflow-hidden" />}
        label="포스트"
        onClick={onPostClick}
      />
    </div>
  );
};
