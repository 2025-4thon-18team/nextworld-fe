// ⭐ PostListHorizontal.tsx — grid & hover-shadow 반영
import { FC, useCallback } from "react";
import { cn } from "@/utils";
import { PostItem } from "@/components/article/PostItem/PostItem";
import { useNavigation } from "@/hooks";
import type { PostResponseDto } from "@/querys/types";

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
  isPaid?: boolean;
  price?: number | null;
  postData?: PostResponseDto;
};

type Props = {
  className?: string;
  items: PostItemData[];
};

export const PostListHorizontal: FC<Props> = ({ className, items }) => {
  const { navigateToPost } = useNavigation();

  const handlePostClick = useCallback(
    (id: string) => navigateToPost(id),
    [navigateToPost],
  );

  return (
    <div
      className={cn(
        // ⭐ 기존 overflow-scroll 삭제 → grid로 운영 가능
        "gap-4",
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
          className="rounded-md transition hover:shadow-md" // ⭐ hover-shadow 추가
          isPaid={item.isPaid}
          price={item.price}
          postData={item.postData}
        />
      ))}
    </div>
  );
};
