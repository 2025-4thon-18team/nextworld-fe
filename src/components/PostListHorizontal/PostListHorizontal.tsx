import { FC, useCallback } from "react";
import { cn } from "@/utils";
import { PostItem } from "@/components/article/PostItem/PostItem";
import { useNavigation } from "@/hooks";

type PostItemData = {
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
  items: PostItemData[];
};

export const PostListHorizontal: FC<Props> = ({ className, items }) => {
  const { navigateToPost } = useNavigation();

  const handlePostClick = useCallback(
    (id: string) => {
      navigateToPost(id);
    },
    [navigateToPost],
  );

  return (
    <div
      className={cn(
        "gap-lg flex h-full items-center overflow-x-scroll scroll-smooth",
        className,
      )}
    >
      {items.map((item) => (
        <PostItem
          key={item.id}
          title={item.title}
          points={item.points}
          content={item.content}
          tags={item.tags}
          rating={item.rating}
          views={item.views}
          comments={item.comments}
          date={item.date}
          onClick={() => handlePostClick(item.id)}
          className="border-background-subtle h-230 min-h-230 w-403 shrink-0 rounded-xs border-t-2 bg-white select-none"
          isPaid={item.isPaid}
          price={item.price}
          postData={item.postData}
        />
      ))}
    </div>
  );
};
