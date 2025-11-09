import { FC } from "react";
import { Tag } from "@/components/Tag/Tag";

interface TagListProps {
  tags: string[];
  className?: string;
}

export const TagList: FC<TagListProps> = ({ tags, className }) => {
  return (
    <div className={`gap-xs flex items-center ${className || ""}`}>
      {tags.map((tag, index) => (
        <Tag key={index} type="default">
          {tag}
        </Tag>
      ))}
    </div>
  );
};
