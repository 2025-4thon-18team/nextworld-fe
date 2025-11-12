import { FC } from "react";
import { PostListHorizontalView } from "./PostListHorizontalView";

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

export const PostListHorizontal: FC<Props> = ({
  className,
  items,
  onItemClick,
}) => {
  return (
    <PostListHorizontalView
      className={className}
      items={items}
      onItemClick={onItemClick}
    />
  );
};

