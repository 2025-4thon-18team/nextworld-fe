import { FC } from "react";
import { PostListVerticalView } from "./PostListVerticalView";

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

export const PostListVertical: FC<Props> = ({
  className,
  items,
  onItemClick,
}) => {
  return (
    <PostListVerticalView
      className={className}
      items={items}
      onItemClick={onItemClick}
    />
  );
};

