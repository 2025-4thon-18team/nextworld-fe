import { FC } from "react";
import { cn } from "@/utils";
import { IconPoint, IconPicture } from "@/assets/icons";
import { ArticleInfo } from "@/components/article/ArticleInfo/ArticleInfo";

interface ContentItemProps {
  title: string;
  points: number;
  rating: number;
  views: number;
  comments: number;
  date: string;
  className?: string;
}

export const ContentItem: FC<ContentItemProps> = ({
  title,
  points,
  rating,
  views,
  comments,
  date,
  className,
}) => {
  return (
    <div
      className={cn(
        "h-[84px] w-[872px] border-t-2 border-[#f8f8f8]",
        className,
      )}
    >
      <div className="py-lg px-md flex h-[84px] w-[872px] items-center justify-between">
        {/* Left section: Title and Article Info */}
        <div className="gap-sm flex flex-col items-start">
          {/* Title with icon */}
          <div className="flex items-center gap-[4px]">
            <IconPicture className="flex size-24 items-center justify-center gap-[10px]" />
            <h3 className="text-headings-heading-3 whitespace-nowrap text-black">
              {title}
            </h3>
          </div>

          {/* Article Info */}
          <div className="flex items-center gap-[91px]">
            <ArticleInfo
              rating={rating}
              views={views}
              comments={comments}
              date={date}
            />
          </div>
        </div>

        {/* Right section: Points */}
        <div className="flex items-center">
          <span className="text-body-large-medium whitespace-nowrap text-black">
            {points}
          </span>
          <IconPoint className="flex size-24 items-center justify-center gap-[10px]" />
        </div>
      </div>
    </div>
  );
};
