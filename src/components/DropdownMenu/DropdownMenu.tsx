import { FC, useState, useRef, useEffect } from "react";
import { cn } from "@/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
  items: Array<{
    label: string;
    onClick: () => void;
    className?: string;
  }>;
  className?: string;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  children,
  items,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative", className)} ref={menuRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center"
      >
        {children}
      </button>
      {isOpen && (
        <div className="bg-white border-default shadow-lg absolute right-0 top-full z-50 mt-xs min-w-120 rounded-md border">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-md py-sm text-left text-body-small-medium text-black hover:bg-background-muted first:rounded-t-md last:rounded-b-md",
                item.className,
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

