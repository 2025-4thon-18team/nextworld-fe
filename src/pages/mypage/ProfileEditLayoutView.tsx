// src/pages/my/ProfileEditLayoutView.tsx
import { FC, ReactNode } from "react";
import { cn } from "@/utils";

interface Props {
  className?: string;
  children: ReactNode;
}

export const ProfileEditLayoutView: FC<Props> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("flex size-full flex-col bg-white", className)}>
      {/* 메인 컨텐츠 */}
      <div className="flex w-full justify-center">
        <div className="w-full max-w-5xl px-20 py-14">{children}</div>
      </div>
    </div>
  );
};
