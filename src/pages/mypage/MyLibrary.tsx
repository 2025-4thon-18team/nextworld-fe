import { useMemo } from "react";
import { MyLibraryView } from "./MyLibraryView";
import {
  useGetPurchasedWorks,
  useGetPurchasedPosts,
} from "@/querys/usePayment";
import { useTab } from "@/hooks/useTab";
import PresetImage from "@/assets/presets/preset-3.png";

type TabType = "구매한 작품" | "구매한 포스트";

const MyLibrary = () => {
  const { activeTab, onTabChange } = useTab<TabType>("구매한 작품");

  // React Query hooks 직접 사용
  const { data: purchasedWorks } = useGetPurchasedWorks();
  const { data: purchasedPosts } = useGetPurchasedPosts();

  // PurchasedWorkResponse를 SeriesCardSmall 형태로 변환
  const worksList = useMemo(() => {
    if (!purchasedWorks || !Array.isArray(purchasedWorks)) return [];
    return purchasedWorks.map((work) => ({
      id: work.workId,
      imageUrl: work.coverImageUrl || PresetImage,
      title: work.title,
    }));
  }, [purchasedWorks]);

  // 포스트 리스트를 PostItem 형태로 변환
  // PurchasedWorkResponse는 PostResponseDto가 아니므로 직접 변환 필요
  const postsList = useMemo(() => {
    if (!purchasedPosts || !Array.isArray(purchasedPosts)) return [];
    return purchasedPosts.map((post) => ({
      id: String(post.postId),
      title: post.title,
      content: "", // PurchasedWorkResponse에는 content가 없음
      points: post.amount || 0,
      tags: [], // PurchasedWorkResponse에는 tags가 없음
      rating: 0, // PurchasedWorkResponse에는 rating이 없음
      views: 0, // PurchasedWorkResponse에는 views가 없음
      comments: 0, // PurchasedWorkResponse에는 comments가 없음
      date: post.purchasedAt,
    }));
  }, [purchasedPosts]);

  return (
    <MyLibraryView
      worksList={worksList}
      postsList={postsList}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
};

export default MyLibrary;
