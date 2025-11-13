import { useCallback } from "react";
import { ViewerView } from "./ViewerView";

const Viewer = () => {
  const onPrevious = useCallback(() => {
    // TODO: 이전 화로 이동
  }, []);

  const onNext = useCallback(() => {
    // TODO: 다음 화로 이동
  }, []);

  const onOriginalSeriesClick = useCallback(() => {
    // TODO: 원작 작품으로 이동
  }, []);

  return (
    <ViewerView
      seriesTitle="[작품명]"
      episodeTitle="제목제목제목제목"
      tags={["현대로맨스", "현대로맨스", "현대로맨스"]}
      authorName="작가명"
      rating={4.5}
      originalSeriesImageUrl="https://placehold.co/50x75"
      originalSeriesLabel="이 유니버스의 '원작' 보기"
      originalSeriesTitle="은해상단 막내아들"
      onPrevious={onPrevious}
      onNext={onNext}
      onOriginalSeriesClick={onOriginalSeriesClick}
    />
  );
};

export default Viewer;
