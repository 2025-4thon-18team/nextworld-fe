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

export const PostListHorizontalView: FC<Props> = ({
  className,
  items,
  onItemClick,
}) => {
  return (
    <div
      className={cn(
        "gap-lg flex h-full items-center overflow-x-scroll scroll-smooth",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "border-background-subtle h-230 min-h-230 w-403 shrink-0 rounded-xs border-t-2 bg-white",
            onItemClick && "cursor-pointer",
          )}
          onClick={() => onItemClick?.(item.id)}
        >
          <div className="px-md py-lg min-h-inherit flex h-230 w-403 flex-col items-start justify-between overflow-hidden rounded-[inherit]">
            <div className="gap-md relative flex w-full shrink-0 flex-col items-start">
              <div className="relative flex w-full shrink-0 items-start justify-between">
                <div className="gap-xs relative flex shrink-0 items-center">
                  <IconPicture className="relative flex size-24 shrink-0 items-center justify-center gap-10" />
                  <h2 className="text-headings-heading-2 tracking-tight text-nowrap whitespace-pre text-black">
                    {item.title}
                  </h2>
                </div>
                <div className="relative flex shrink-0 flex-col items-start gap-10">
                  <Point
                    value={item.points}
                    showPrefix={false}
                    className="relative flex w-full shrink-0 items-end"
                  />
                </div>
              </div>
              <p className="text-body-medium w-379 tracking-tight text-black">
                {item.content}
              </p>
            </div>
            <div className="gap-sm relative flex shrink-0 flex-col items-start">
              <TagList
                tags={item.tags}
                className="relative flex shrink-0 items-center"
              />
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
