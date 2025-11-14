import { FC, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";
import { useNavigation } from "@/hooks/useNavigation";

interface AddSeriesProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const AddSeries: FC<AddSeriesProps> = ({ className, ...props }) => {
  const { navigateToCreateSeries } = useNavigation();

  const handleAddSeries = () => {
    navigateToCreateSeries();
  };

  return (
    <button
      type="button"
      className={cn("gap-xs flex h-262 w-150 flex-col items-center", className)}
      onClick={handleAddSeries}
      {...props}
    >
      <div className="bg-background-subtle border-grayscale-g2 relative flex h-225 w-150 shrink-0 items-center justify-center rounded-sm border-2 border-dashed">
        <span className="text-grayscale-g3 text-4xl">+</span>
      </div>
      <p className="text-body-medium w-min-content min-w-full text-center tracking-tight text-black">
        연재할 작품 추가하기
      </p>
    </button>
  );
};
