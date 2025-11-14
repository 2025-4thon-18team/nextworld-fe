import { FC } from "react";
import { HomeCategory } from "@/components/HomeCategory/HomeCategory";
import { Outlet } from "react-router-dom";
import { cn } from "@/utils";

type Props = {
  className?: string;
};

export const HomeLayoutView: FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col w-full min-h-screen bg-white", className)}>
      <div className="flex h-20 shrink-0 w-full items-center justify-center">
        <HomeCategory />
      </div>

      <main className="mx-auto w-full max-w-1280">
        <Outlet />
      </main>
    </div>
  );
};
