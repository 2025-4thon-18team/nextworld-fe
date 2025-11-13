import { FC } from "react";
import { Tag } from "@/components/Tag/Tag";

interface TagListProps {
  tags: string[];
  className?: string;
  type?: "default" | "muted";
}

export const TagList: FC<TagListProps> = ({
  tags,
  className,
  type = "default",
}) => {
  return (
    <div className={`gap-xs flex items-center ${className || ""}`}>
      {tags.map((tag, index) => (
        <Tag key={index} type={type}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
