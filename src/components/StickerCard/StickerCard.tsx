import { FC, PropsWithChildren } from "react";
import { cn } from "@/utils";

type StickerCardVariant = "primary" | "secondary";

interface StickerCardProps extends PropsWithChildren {
  variant?: StickerCardVariant;
  className?: string;
}

export const StickerCard: FC<StickerCardProps> = ({
  children,
  variant = "primary",
  className,
}) => {
  const variantStyles = {
    primary: "bg-foreground-subtle",
    secondary: "bg-secondary-300",
  };

  return (
    <div
      className={cn(
        "flex w-[339px] flex-col items-start gap-[10px] p-lg",
        variantStyles[variant],
        className,
      )}
    >
      <p className="text-body-medium w-full text-black">{children}</p>
    </div>
  );
};

