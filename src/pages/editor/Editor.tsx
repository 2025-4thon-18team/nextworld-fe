import { useState, useCallback, useMemo } from "react";
import { EditorView } from "./EditorView";
import { useNavigation } from "@/hooks/useNavigation";
import {
  useCreatePost,
  useSaveDraft,
  useGetAllDrafts,
  useGetDraftById,
  useUpdatePost,
  useDeletePost,
} from "@/querys/usePosts";
import { useUploadWorkImage } from "@/querys/useWorks";
import { useCreateWork } from "@/querys/useWorks";
import { useSettleRevenue } from "@/querys/useRevenue";
import { useGetAllWorks } from "@/querys/useWorks";
import { useSearch } from "@/querys/useFeed";
import { toast } from "sonner";
import type { PostRequestDto } from "@/querys/types";

type EditorVariant = "original-post" | "secondary-post" | "secondary-series";

interface EditorProps {
  variant?: EditorVariant;
}

const Editor = ({ variant = "original-post" }: EditorProps) => {
  const { navigateBack } = useNavigation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postSelected, setPostSelected] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [allowDerivative, setAllowDerivative] = useState(false);
  const [paidPost, setPaidPost] = useState(false);
  const [episodePrice, setEpisodePrice] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | undefined>(
    variant === "secondary-post" ? undefined : undefined,
  );
  const [categoryTab, setCategoryTab] = useState<"내 작품" | "원작">("내 작품");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDraftId, setSelectedDraftId] = useState<number | null>(null);
  const [sidebarVariant, setSidebarVariant] = useState<
    "post-type" | "series-type" | "guideline"
  >("post-type");

  // API Hooks
  const { mutate: createPost } = useCreatePost();
  const { mutate: saveDraft } = useSaveDraft();
  const { data: allDrafts } = useGetAllDrafts();
  const { data: draftData } = useGetDraftById(selectedDraftId || 0);
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: uploadImage, isPending: isUploading } = useUploadWorkImage();
  const { mutate: createWork } = useCreateWork();
  const { mutate: settleRevenue } = useSettleRevenue();
  // TODO: /api/mypage/works 엔드포인트가 없어서 전체 작품 목록 조회 사용
  const { data: myWorks } = useGetAllWorks();
  const { data: searchResults } = useSearch(searchValue);

  // 작품 목록 (내 작품 또는 검색 결과)
  const series = useMemo(() => {
    if (categoryTab === "내 작품") {
      return (
        myWorks?.map((work) => ({
          imageUrl: work.coverImageUrl,
          title: work.title,
          id: String(work.id),
        })) || []
      );
    } else {
      // 원작 검색 결과
      return (
        searchResults?.works?.map((work) => ({
          imageUrl: work.coverImageUrl,
          title: work.title,
          id: String(work.id),
        })) || []
      );
    }
  }, [categoryTab, myWorks, searchResults]);

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
    // 작품 생성 페이지로 이동하거나 모달 열기
    // TODO: 작품 생성 페이지로 네비게이션 또는 모달 구현
    console.log("Add series - 작품 생성 페이지로 이동 필요");
  }, []);

  const onCategoryTabChange = useCallback((tab: "내 작품" | "원작") => {
    setCategoryTab(tab);
  }, []);

  const onTagsChange = useCallback((tags: string[]) => {
    setTags(tags);
  }, []);

  const onBack = useCallback(() => {
    navigateBack();
  }, [navigateBack]);

  const onLoad = useCallback(() => {
    // 임시저장 목록을 보여주는 모달이나 드롭다운 필요
    // TODO: 임시저장 목록 UI 구현 필요
    if (allDrafts && allDrafts.length > 0) {
      // 첫 번째 임시저장 불러오기 (실제로는 사용자가 선택하도록 UI 필요)
      const firstDraft = allDrafts[0];
      setSelectedDraftId(firstDraft.id);
      setTitle(firstDraft.title);
      setContent(firstDraft.content);
      if (firstDraft.workId) {
        setSelectedSeriesId(String(firstDraft.workId));
      }
    }
  }, [allDrafts]);

  const onSave = useCallback(() => {
    if (!title.trim() || !content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    const postData: PostRequestDto = {
      title,
      content,
      postType: postSelected ? "POST" : "EPISODE",
      creationType: variant === "secondary-post" ? "DERIVATIVE" : "ORIGINAL",
      workId: selectedSeriesId ? Number(selectedSeriesId) : undefined,
      status: "DRAFT",
    };

    if (selectedDraftId) {
      // 기존 임시저장 업데이트
      updatePost(
        {
          id: selectedDraftId,
          data: postData,
        },
        {
          onSuccess: () => {
            toast.success("임시저장되었습니다.");
          },
          onError: () => {
            toast.error("임시저장에 실패했습니다.");
          },
        },
      );
    } else {
      // 새 임시저장
      saveDraft(postData, {
        onSuccess: (data) => {
          setSelectedDraftId(data.id);
          toast.success("임시저장되었습니다.");
        },
        onError: () => {
          toast.error("임시저장에 실패했습니다.");
        },
      });
    }
  }, [
    title,
    content,
    postSelected,
    variant,
    selectedSeriesId,
    selectedDraftId,
    saveDraft,
    updatePost,
  ]);

  // 포스트 발행 (EditorHeader의 "발행하기" 버튼)
  const onPublish = useCallback(() => {
    if (!title.trim() || !content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    const postData: PostRequestDto = {
      title,
      content,
      postType: postSelected ? "POST" : "EPISODE",
      creationType: variant === "secondary-post" ? "DERIVATIVE" : "ORIGINAL",
      workId: selectedSeriesId ? Number(selectedSeriesId) : undefined,
      status: "PUBLISHED",
    };

    createPost(postData, {
      onSuccess: () => {
        toast.success("포스트가 발행되었습니다.");
        navigateBack();
      },
      onError: () => {
        toast.error("포스트 발행에 실패했습니다.");
      },
    });
  }, [
    title,
    content,
    postSelected,
    variant,
    selectedSeriesId,
    createPost,
    navigateBack,
  ]);

  // 정산하기 (별도 기능, 현재는 사용하지 않음)
  const onSettle = useCallback(() => {
    settleRevenue(undefined, {
      onSuccess: (data) => {
        toast.success(
          `정산이 완료되었습니다. 정산 금액: ${data.totalSettledAmount}원`,
        );
      },
      onError: () => {
        toast.error("정산에 실패했습니다.");
      },
    });
  }, [settleRevenue]);

  const onAddImage = useCallback(() => {
    // 파일 입력 요소 생성
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadImage(file, {
          onSuccess: (imageUrl) => {
            // 이미지 URL을 콘텐츠에 삽입
            const imageMarkdown = `![이미지](${imageUrl})\n`;
            setContent((prev) => prev + imageMarkdown);
            toast.success("이미지가 업로드되었습니다.");
          },
          onError: () => {
            toast.error("이미지 업로드에 실패했습니다.");
          },
        });
      }
    };
    input.click();
  }, [uploadImage]);

  const onSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const onPostClick = useCallback(() => {
    setSidebarVariant("post-type");
    setSidebarOpen(true);
  }, []);

  const onGuidelineClick = useCallback(() => {
    setSidebarVariant("guideline");
    setSidebarOpen(true);
  }, []);

  // 포스트 탭일 경우 원작 설정을 무조건 해야 함
  const shouldRequireOriginal = postSelected && variant === "secondary-post";

  return (
    <EditorView
      title={title}
      content={content}
      postSelected={postSelected}
      tags={tags}
      allowDerivative={shouldRequireOriginal ? true : allowDerivative}
      paidPost={paidPost}
      episodePrice={episodePrice}
      searchValue={searchValue}
      series={series}
      selectedSeriesId={selectedSeriesId}
      categoryTab={categoryTab}
      sidebarOpen={sidebarOpen}
      sidebarVariant={sidebarVariant}
      editorVariant={variant}
      onTitleChange={onTitleChange}
      onContentChange={onContentChange}
      onPostChange={onPostChange}
      onAllowDerivativeChange={
        shouldRequireOriginal ? undefined : onAllowDerivativeChange
      }
      onPaidPostChange={onPaidPostChange}
      onEpisodePriceChange={onEpisodePriceChange}
      onSearchChange={onSearchChange}
      onSeriesSelect={onSeriesSelect}
      onAddSeries={onAddSeries}
      onCategoryTabChange={onCategoryTabChange}
      onBack={onBack}
      onLoad={onLoad}
      onSave={onSave}
      onSettle={onPublish}
      onAddImage={onAddImage}
      onSidebarClose={onSidebarClose}
      onPostClick={onPostClick}
      onGuidelineClick={onGuidelineClick}
      onTagsChange={onTagsChange}
    />
  );
};

export default Editor;
