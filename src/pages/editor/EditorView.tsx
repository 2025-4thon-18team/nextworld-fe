import { FC, useMemo } from "react";
import { EditorHeader } from "@/components/EditorHeader/EditorHeader";
import { PostTypeSidebar } from "@/components/PostTypeSidebar/PostTypeSidebar";
import { GuidelineSidebar } from "@/components/GuidelineSidebar/GuidelineSidebar";
import { EditorBody } from "./components/EditorBody";
import { useBlockEditor } from "./hooks/useBlockEditor";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useEditorImage } from "./hooks/useEditorImage";
import { Toaster } from "sonner";
import type { WorkResponseDto } from "@/querys/types";

type Props = {
  title: string;
  content: string;
  postSelected: boolean;
  tags: string[];
  paidPost: boolean;
  episodePrice: string;
  searchValue: string;
  series: Array<{ imageUrl: string; title: string; id?: string }>;
  categoryTab: "내 작품" | "원작";
  sidebarOpen: boolean;
  sidebarVariant?: "post-type" | "series-type" | "guideline";
  editorVariant: "original-post" | "secondary-post" | "secondary-series";
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onPostChange: (selected: boolean) => void;
  onPaidPostChange: (checked: boolean) => void;
  onEpisodePriceChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSeriesSelect: (index: number) => void;
  onWorkSelect?: (work: WorkResponseDto) => void;
  selectedPostWorkId?: string | number;
  selectedEpisodeWorkId?: string | number;
  originalWorkId?: number;
  onAddSeries: () => void;
  onCategoryTabChange: (tab: "내 작품" | "원작") => void;
  onBack: () => void;
  onLoad: () => void;
  onSave: () => void;
  onSettle: () => void;
  onAddImage: () => void;
  onSidebarClose: () => void;
  onPostClick?: () => void;
  onGuidelineClick?: () => void;
  onTagsChange: (tags: string[]) => void;
  isPublishing?: boolean;
  showPublish?: boolean;
  showGuideline?: boolean;
};

export const EditorView: FC<Props> = ({
  title,
  content,
  postSelected,
  tags,
  paidPost,
  episodePrice,
  searchValue,
  series,
  categoryTab,
  sidebarOpen,
  sidebarVariant: sidebarVariantProp,
  editorVariant,
  onTitleChange,
  onContentChange,
  onPostChange,
  onPaidPostChange,
  onEpisodePriceChange,
  onSearchChange,
  onSeriesSelect,
  onWorkSelect,
  selectedPostWorkId,
  selectedEpisodeWorkId,
  originalWorkId,
  onAddSeries,
  onCategoryTabChange,
  onBack,
  onLoad,
  onPostClick,
  onGuidelineClick,
  onSave,
  onSettle,
  onAddImage,
  onSidebarClose,
  onTagsChange,
  isPublishing = false,
  showPublish = true,
  showGuideline = true,
}) => {
  // 블록 에디터 훅
  const {
    blocks,
    setBlocks,
    handleBlockInput,
    handleBlockKeyDown,
    insertBlock,
  } = useBlockEditor({
    initialContent: content,
    onContentChange,
  });

  // 드래그 앤 드롭 훅
  const { draggingId, handleDragStart, handleDragOver, handleDragEnd } =
    useDragAndDrop({
      blocks,
      onBlocksChange: setBlocks,
    });

  // 이미지 삽입 훅
  useEditorImage({
    blocks,
    onInsertImage: insertBlock,
  });

  // 에디터 옵션 variant 계산
  const editorOptionsVariant = useMemo(() => {
    if (editorVariant === "secondary-series") {
      return "series";
    }
    return "post-with-settlement";
  }, [editorVariant]);

  // 사이드바 variant 계산
  const sidebarVariant = useMemo(():
    | "post-type"
    | "series-type"
    | "guideline" => {
    if (sidebarVariantProp) {
      return sidebarVariantProp;
    }
    if (editorVariant === "secondary-series") {
      return "series-type";
    }
    return "post-type";
  }, [sidebarVariantProp, editorVariant]);

  // 사이드바 렌더링
  const renderSidebar = () => {
    if (!sidebarOpen) return null;

    const currentVariant = sidebarVariant;

    if (currentVariant === "guideline") {
      return (
        <GuidelineSidebar
          title="가이드라인"
          onClose={onSidebarClose}
          originalWorkId={originalWorkId}
          className="absolute top-0 right-0"
        />
      );
    }

    // post-type일 때는 postTypeTab에 따라 표시, series-type일 때는 항상 "작품 연재" 표시
    const postTypeTabValue =
      currentVariant === "series-type"
        ? "작품 연재"
        : postSelected
          ? "포스트"
          : "작품 연재";

    return (
      <PostTypeSidebar
        title="업로드 유형"
        onClose={onSidebarClose}
        variant={currentVariant === "series-type" ? "series-type" : "post-type"}
        postTypeTab={postTypeTabValue}
        onPostTypeTabChange={(tab) => onPostChange?.(tab === "포스트")}
        searchValue={searchValue}
        onSearchChange={(e) => onSearchChange?.(e.target.value)}
        onWorkSelect={onWorkSelect}
        selectedPostWorkId={selectedPostWorkId}
        selectedEpisodeWorkId={selectedEpisodeWorkId}
        series={series}
        onSeriesClick={onSeriesSelect}
        paidPostEnabled={paidPost}
        onPaidPostChange={onPaidPostChange}
        priceValue={episodePrice}
        onPriceChange={onEpisodePriceChange}
        tags={tags}
        onAddSeries={onAddSeries}
        categoryTab={categoryTab}
        onCategoryTabChange={onCategoryTabChange}
        onTagsChange={onTagsChange}
        className="absolute top-0 right-0"
      />
    );
  };

  return (
    <div className="bg-background-subtle relative flex h-full min-h-screen w-full flex-col items-center">
      <Toaster position="top-center" />
      <EditorHeader
        onBack={onBack}
        onLoad={onLoad}
        onSave={onSave}
        onSettle={onSettle}
        onAddImage={onAddImage}
        editorOptionsVariant={editorOptionsVariant}
        onPostClick={onPostClick}
        onGuidelineClick={onGuidelineClick}
        isPublishing={isPublishing}
        showPublish={showPublish}
        showGuideline={showGuideline}
      />

      <div className="relative flex w-full grow items-start justify-center gap-10">
        {/* Editor Area */}
        <EditorBody
          title={title}
          blocks={blocks}
          draggingId={draggingId}
          onTitleChange={onTitleChange}
          onBlockInput={handleBlockInput}
          onBlockKeyDown={handleBlockKeyDown}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        />

        {/* Sidebar */}
        {renderSidebar()}
      </div>
    </div>
  );
};
