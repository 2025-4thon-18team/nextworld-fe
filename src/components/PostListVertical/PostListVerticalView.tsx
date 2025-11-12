import { FC } from "react";
import { cn } from "@/utils";
import { IconPicture } from "@/assets/icons";
import { ArticleInfo } from "@/components/article/ArticleInfo/ArticleInfo";
import { Point } from "@/components/Point/Point";
import { TagList } from "@/components/TagList/TagList";

type PostItem = {
  id: string;
  title: string;
  content: string;
  points: number;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  date: string;
};

type Props = {
  className?: string;
  items: PostItem[];
  onItemClick?: (id: string) => void;
};

export const PostListVerticalView: FC<Props> = ({
  className,
  items,
  onItemClick,
}) => {
  return (
    <div className={cn("gap-lg flex flex-wrap items-start", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "bg-white border-t-2 border-background-subtle h-230 min-h-230 rounded-xs shrink-0 w-403",
            onItemClick && "cursor-pointer",
          )}
          onClick={() => onItemClick?.(item.id)}
        >
          <div className="px-md py-lg flex h-230 flex-col items-start justify-between min-h-inherit overflow-hidden rounded-[inherit] w-403">
            <div className="gap-md flex flex-col items-start relative shrink-0 w-full">
              <div className="flex items-start justify-between relative shrink-0 w-full">
                <div className="gap-xs flex items-center relative shrink-0">
                  <IconPicture className="flex size-24 items-center justify-center gap-10 relative shrink-0" />
                  <h2 className="text-headings-heading-2 text-nowrap tracking-tight text-black whitespace-pre">
                    {item.title}
                  </h2>
                </div>
                <div className="flex flex-col gap-10 items-start relative shrink-0">
                  <Point
                    value={item.points}
                    showPrefix={false}
                    className="flex items-end relative shrink-0 w-full"
                  />
                </div>
              </div>
              <p className="text-body-medium text-black tracking-tight w-379">
                {item.content}
              </p>
            </div>
            <div className="gap-sm flex flex-col items-start relative shrink-0">
              <TagList tags={item.tags} className="flex items-center relative shrink-0" />
              <ArticleInfo
                rating={item.rating}
                views={item.views}
                comments={item.comments}
                date={item.date}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

