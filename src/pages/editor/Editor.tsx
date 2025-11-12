import { EditorView } from "./EditorView";
import { useEditor } from "@/logic/useEditor";

type EditorVariant = "original-post" | "secondary-post" | "secondary-series";

interface EditorProps {
  variant?: EditorVariant;
}

const Editor = ({ variant = "original-post" }: EditorProps) => {
  const {
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
    onSave,
    onSettle,
    onAddImage,
    onSidebarClose,
  } = useEditor(variant);

  return (
    <EditorView
      title={title}
      content={content}
      postSelected={postSelected}
      tags={tags}
      allowDerivative={allowDerivative}
      paidPost={paidPost}
      episodePrice={episodePrice}
      searchValue={searchValue}
      series={series}
      selectedSeriesId={selectedSeriesId}
      categoryTab={categoryTab}
      sidebarOpen={sidebarOpen}
      editorVariant={editorVariant}
      onTitleChange={onTitleChange}
      onContentChange={onContentChange}
      onPostChange={onPostChange}
      onAllowDerivativeChange={onAllowDerivativeChange}
      onPaidPostChange={onPaidPostChange}
      onEpisodePriceChange={onEpisodePriceChange}
      onSearchChange={onSearchChange}
      onSeriesSelect={onSeriesSelect}
      onAddSeries={onAddSeries}
      onCategoryTabChange={onCategoryTabChange}
      onBack={onBack}
      onLoad={onLoad}
      onSave={onSave}
      onSettle={onSettle}
      onAddImage={onAddImage}
      onSidebarClose={onSidebarClose}
    />
  );
};

export default Editor;
