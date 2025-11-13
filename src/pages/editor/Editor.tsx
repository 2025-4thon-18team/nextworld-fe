import { useState, useCallback } from "react";
import { EditorView } from "./EditorView";
import { useNavigation } from "@/hooks/useNavigation";

type EditorVariant = "original-post" | "secondary-post" | "secondary-series";

interface EditorProps {
  variant?: EditorVariant;
}

const Editor = ({ variant = "original-post" }: EditorProps) => {
  const { navigateBack } = useNavigation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postSelected, setPostSelected] = useState(true);
  const [tags] = useState<string[]>([]);
  const [allowDerivative, setAllowDerivative] = useState(false);
  const [paidPost, setPaidPost] = useState(false);
  const [episodePrice, setEpisodePrice] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [series] = useState<
    Array<{ imageUrl: string; title: string; id?: string }>
  >([
    {
      imageUrl: "https://placehold.co/150x225",
      title: "[작품 제목]",
      id: "0",
    },
    {
      imageUrl: "https://placehold.co/150x225",
      title: "[작품 제목]",
      id: "1",
    },
  ]);
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | undefined>(
    variant === "secondary-post" ? "0" : undefined,
  );
  const [categoryTab, setCategoryTab] = useState<"내 작품" | "원작">("내 작품");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const onTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const onContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const onPostChange = useCallback((selected: boolean) => {
    setPostSelected(selected);
  }, []);

  const onAllowDerivativeChange = useCallback((checked: boolean) => {
    setAllowDerivative(checked);
  }, []);

  const onPaidPostChange = useCallback((checked: boolean) => {
    setPaidPost(checked);
  }, []);

  const onEpisodePriceChange = useCallback((value: string) => {
    setEpisodePrice(value);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const onSeriesSelect = useCallback(
    (index: number) => {
      const selectedId = series[index]?.id || String(index);
      setSelectedSeriesId(selectedId);
    },
    [series],
  );

  const onAddSeries = useCallback(() => {
    // TODO: 작품 추가 로직
    console.log("Add series");
  }, []);

  const onCategoryTabChange = useCallback((tab: "내 작품" | "원작") => {
    setCategoryTab(tab);
  }, []);

  const onBack = useCallback(() => {
    navigateBack();
  }, [navigateBack]);

  const onLoad = useCallback(() => {
    // TODO: 불러오기 로직
    console.log("Load");
  }, []);

  const onSave = useCallback(() => {
    // TODO: 저장 로직
    console.log("Save");
  }, []);

  const onSettle = useCallback(() => {
    // TODO: 정산하기 로직
    console.log("Settle");
  }, []);

  const onAddImage = useCallback(() => {
    // TODO: 이미지 추가 로직
    console.log("Add image");
  }, []);

  const onSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

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
      editorVariant={variant}
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
