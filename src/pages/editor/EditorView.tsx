import { FC, useRef, useEffect } from "react";
import { EditorHeader } from "@/components/EditorHeader/EditorHeader";
import { PostTypeSidebar } from "@/components/PostTypeSidebar/PostTypeSidebar";
import { GuidelineSidebar } from "@/components/GuidelineSidebar/GuidelineSidebar";

type Props = {
  title: string;
  content: string;
  postSelected: boolean;
  tags: string[];
  allowDerivative: boolean;
  paidPost: boolean;
  episodePrice: string;
  searchValue: string;
  series: Array<{ imageUrl: string; title: string; id?: string }>;
  selectedSeriesId?: string;
  categoryTab: "내 작품" | "원작";
  sidebarOpen: boolean;
  sidebarVariant?: "post-type" | "series-type" | "guideline";
  editorVariant: "original-post" | "secondary-post" | "secondary-series";
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onPostChange: (selected: boolean) => void;
  onAllowDerivativeChange?: (checked: boolean) => void;
  onPaidPostChange: (checked: boolean) => void;
  onEpisodePriceChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSeriesSelect: (index: number) => void;
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
};

export const EditorView: FC<Props> = ({
  title,
  content,
  postSelected,
  tags,
  allowDerivative,
  paidPost,
  episodePrice,
  searchValue,
  series,
  selectedSeriesId,
  categoryTab,
  sidebarOpen,
  sidebarVariant: sidebarVariantProp,
  editorVariant,
  onTitleChange,
  onContentChange,
  onPostChange,
  onAllowDerivativeChange,
  onPaidPostChange,
  onEpisodePriceChange,
  onSearchChange,
  onSeriesSelect,
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
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 초기 높이 설정
      textarea.style.height = "auto";
      // scrollHeight를 사용하여 내용에 맞게 높이 조절
      textarea.style.height = `${Math.max(textarea.scrollHeight, 600)}px`;
    }
  }, [content]);

  const getEditorOptionsVariant = () => {
    if (editorVariant === "secondary-series") {
      return "series";
    }
    return "post-with-settlement";
  };

  const getSidebarVariant = (): "post-type" | "series-type" | "guideline" => {
    if (sidebarVariantProp) {
      return sidebarVariantProp;
    }
    if (editorVariant === "secondary-series") {
      return "series-type";
    }
    return "post-type";
  };

  return (
    <div className="bg-background-subtle relative flex min-h-screen w-full flex-col items-center">
      <EditorHeader
        onBack={onBack}
        onLoad={onLoad}
        onSave={onSave}
        onSettle={onSettle}
        onAddImage={onAddImage}
        editorOptionsVariant={getEditorOptionsVariant()}
        onPostClick={onPostClick}
        onGuidelineClick={onGuidelineClick}
      />

      <div className="relative flex h-full w-full items-start justify-center gap-10">
        {/* Editor Area */}
        <div className="relative flex h-full w-890 shrink-0 flex-col bg-white">
          {/* Editable Content */}
          <div className="flex h-fit flex-col gap-10 px-59 pt-39">
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="제목"
              className="text-headings-heading-2 w-full bg-transparent tracking-tight text-black outline-none placeholder:text-black"
            />
            <div className="h-0 w-full border-t border-black" />
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => {
                onContentChange(e.target.value);
                // 높이 자동 조절
                const textarea = e.target;
                textarea.style.height = "auto";
                textarea.style.height = `${Math.max(textarea.scrollHeight, 600)}px`;
              }}
              placeholder="본문"
              className="text-body-regular min-h-600 w-full resize-none bg-transparent tracking-tight text-black outline-none placeholder:text-black"
            />
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen &&
          (() => {
            const currentVariant = getSidebarVariant();

            if (currentVariant === "guideline") {
              return (
                <GuidelineSidebar
                  title="가이드라인"
                  onClose={onSidebarClose}
                  categoryTab={categoryTab}
                  onCategoryTabChange={onCategoryTabChange}
                  forbiddenWords={[]}
                  sections={[]}
                  className="absolute top-0 right-0 h-full"
                />
              );
            }

            return (
              <PostTypeSidebar
                title="업로드 유형"
                onClose={onSidebarClose}
                variant={
                  currentVariant === "series-type" ? "series-type" : "post-type"
                }
                postTypeTab={postSelected ? "포스트" : "작품 연재"}
                onPostTypeTabChange={(tab) => onPostChange?.(tab === "포스트")}
                originalSelected={allowDerivative}
                onOriginalChange={onAllowDerivativeChange}
                originalDisabled={onAllowDerivativeChange === undefined}
                searchValue={searchValue}
                onSearchChange={(e) => onSearchChange?.(e.target.value)}
                series={series.map((item, index) => ({
                  imageUrl: item.imageUrl,
                  title: item.title,
                  selected: selectedSeriesId === (item.id || String(index)),
                }))}
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
                className="absolute top-0 right-0 h-full"
              />
            );
          })()}
      </div>
    </div>
  );
};
