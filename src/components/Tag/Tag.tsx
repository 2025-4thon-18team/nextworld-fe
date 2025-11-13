import { cn } from "@/utils";
import { FC } from "react";

interface TagProps {
  children: string;
  type: "default" | "muted";
}
export const Tag: FC<TagProps> = ({ children, type }) => {
  const bgColor =
    type === "default" ? "bg-foreground-subtle" : "bg-background-subtle";
  const textColor = type === "default" ? "text-muted" : "text-muted";
  return (
    <div
      className={cn(
        bgColor,
        "py-xs flex items-center justify-center rounded-md px-[10px]",
      )}
    >
      <span className={cn(textColor, "text-caption-regular whitespace-nowrap")}>
        {children}
      </span>
    </div>
  );
};

