import { FC, InputHTMLAttributes } from "react";
import { cn } from "@/utils";
import { IconSearch } from "@/assets/icons";

interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
}

export const Search: FC<SearchProps> = ({
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <div
      className={cn(
        "border-md border-grayscale-g2 flex items-center gap-10 rounded-md px-lg py-md",
        className
      )}
    >
      <IconSearch className="size-24 shrink-0 overflow-hidden" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)} // ⭐ 수정된 부분
        className="text-body-medium flex-1 bg-transparent text-black tracking-tight outline-none placeholder:text-text-subtle"
        placeholder="검색어를 입력하세요"
        {...props}
      />
    </div>
  );
};
