import { FC } from "react";
import { cn } from "@/utils";
import { IconPoint, IconPicture } from "@/assets/icons";
import { ArticleInfo } from "@/components/article/ArticleInfo/ArticleInfo";
import { Tag } from "@/components/Tag/Tag";

interface PostItemProps {
  title: string;
  points: number;
  content: string;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  date: string;
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
  className,
}) => {
  return (
    <div
      className={cn(
        "w-400 rounded-xs border-t-2 border-(--border-default) bg-(--background-subtle)",
        className,
      )}
    >
      <div className="px-md py-lg flex flex-col items-start gap-20 overflow-hidden rounded-[inherit]">
        {/* Title and Points */}
        <div className="flex w-full items-center justify-between">
          <div className="gap-xs flex items-center">
            <IconPicture />
            <h2 className="text-headings-heading-2 whitespace-nowrap text-black">
              {title}
            </h2>
          </div>
          <div className="flex items-center">
            <span className="text-body-large-medium whitespace-nowrap text-black">
              {points}
            </span>
            <div className="flex size-24 items-center justify-center gap-10">
              <IconPoint />
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-body-medium text-grayscale-black w-380">{content}</p>

        {/* Tags and ArticleInfo */}
        <div className="gap-sm flex flex-col items-start">
          <div className="gap-xs flex items-center">
            {tags.map((tag, index) => (
              <Tag key={index} type="default">
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
