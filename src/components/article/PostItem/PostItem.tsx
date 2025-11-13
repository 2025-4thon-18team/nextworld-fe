import { FC } from "react";
import { cn } from "@/utils";
import { IconPicture } from "@/assets/icons";
import { ArticleInfo } from "@/components/article/ArticleInfo/ArticleInfo";
import { Tag } from "@/components/Tag/Tag";
import { Point } from "@/components/Point/Point";

interface PostItemProps {
  title: string;
  points: number;
  content: string;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  date: string;
  showIconPicture?: boolean;
  showPoint?: boolean;
  className?: string;
}

export const PostItem: FC<PostItemProps> = ({
  title,
  points,
  content,
  tags,
  rating,
  views,
  comments,
  date,
  showIconPicture = true,
  showPoint = true,
  className,
}) => {
  return (
    <div
      className={cn(
        "border-t-md border-grayscale-g1 h-230 min-h-230 w-401 rounded-xs border-r-0 border-b-0 border-l-0 border-solid bg-white",
        className,
      )}
    >
      <div className="min-h-inherit px-md py-lg relative box-border flex h-230 w-401 flex-col items-start justify-between overflow-hidden rounded-[inherit]">
        {/* Title and Content Section */}
        <div className="gap-md relative flex w-full shrink-0 flex-col items-start">
          {/* Title and Points */}
          <div className="relative flex w-full shrink-0 items-start justify-between">
            <div className="relative flex shrink-0 items-center gap-4">
              {showIconPicture && (
                <IconPicture className="relative flex size-24 shrink-0 items-center justify-center gap-10" />
              )}
              <p className="text-headings-heading-2 tracking-tight text-nowrap whitespace-pre text-black">
                {title}
              </p>
            </div>
            {showPoint && (
              <div className="relative flex shrink-0 flex-col items-start gap-10">
                <Point
                  value={points}
                  showPrefix={false}
                  className="relative flex w-full shrink-0 items-end justify-end"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <p className="text-body-medium w-379 tracking-tight text-black">
            {content}
          </p>
        </div>

        {/* Tags and ArticleInfo */}
        <div className="gap-sm relative flex shrink-0 flex-col items-start">
          <div className="gap-xs relative flex shrink-0 items-center">
            {tags.map((tag, index) => (
              <Tag key={index} type="muted">
                {tag}
              </Tag>
            ))}
          </div>
          <ArticleInfo
            rating={rating}
            views={views}
            comments={comments}
            date={date}
          />
        </div>
      </div>
    </div>
  );
};
