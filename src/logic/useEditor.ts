import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type EditorVariant = "original-post" | "secondary-post" | "secondary-series";

export function useEditor(variant: EditorVariant = "original-post") {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postSelected, setPostSelected] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [allowDerivative, setAllowDerivative] = useState(false);
  const [paidPost, setPaidPost] = useState(false);
  const [episodePrice, setEpisodePrice] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [series, setSeries] = useState<
    Array<{ imageUrl: string; title: string; id?: string }>
  >([
    {
      imageUrl: "https://via.placeholder.com/150x225",
      title: "[작품 제목]",
      id: "0",
    },
    {
      imageUrl: "https://via.placeholder.com/150x225",
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
    navigate(-1);
  }, [navigate]);

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

  return {
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
    editorVariant: variant,
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
  };
}
