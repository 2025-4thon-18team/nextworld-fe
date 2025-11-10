import { ViewerView } from "./ViewerView";
import { useViewer } from "@/logic/useViewer";

const Viewer = () => {
  const { onPrevious, onNext, onOriginalSeriesClick } = useViewer();

  return (
    <ViewerView
      seriesTitle="[작품명]"
      episodeTitle="제목제목제목제목"
      tags={["현대로맨스", "현대로맨스", "현대로맨스"]}
      authorName="작가명"
      rating={4.5}
      originalSeriesImageUrl="https://via.placeholder.com/50x75"
      originalSeriesLabel="이 유니버스의 '원작' 보기"
      originalSeriesTitle="은해상단 막내아들"
      onPrevious={onPrevious}
      onNext={onNext}
      onOriginalSeriesClick={onOriginalSeriesClick}
    />
  );
};

export default Viewer;
