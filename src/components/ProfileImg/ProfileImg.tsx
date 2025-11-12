import { FC, ImgHTMLAttributes } from "react";
import { cn } from "@/utils";
import { IconProfileIcon } from "@/assets/icons";

interface ProfileImgProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  imageUrl?: string;
  size?: "sm" | "lg";
  className?: string;
}

export const ProfileImg: FC<ProfileImgProps> = ({
  imageUrl,
  size = "lg",
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "size-36",
    lg: "size-120",
  };

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        className,
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Profile"
          className="pointer-events-none absolute inset-0 size-full object-cover object-center"
          {...props}
        />
      ) : (
        <IconProfileIcon
          fillcolor="#000"
          strokecolor="#000"
          className="absolute inset-0 size-full"
        />
      )}
    </div>
  );
};
