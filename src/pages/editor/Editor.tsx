import { useState, useCallback, useMemo } from "react";
import { EditorView } from "./EditorView";
import { useNavigation } from "@/hooks/useNavigation";
import { RejectionPopup } from "@/components/RejectionPopup/RejectionPopup";
import { DraftListPopup } from "@/components/DraftListPopup/DraftListPopup";
import {
  useCreatePost,
  useSaveDraft,
  useGetAllDrafts,
  useUpdatePost,
} from "@/querys/usePosts";
import { useUploadWorkImage } from "@/querys/useWorks";
import { useGetAllWorks } from "@/querys/useWorks";
import { useSearch } from "@/querys/useFeed";
import { toast } from "sonner";
import axios from "axios";
import type {
  PostRequestDto,
  PostResponseDto,
  WorkResponseDto,
} from "@/querys/types";

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
  const [paidPost, setPaidPost] = useState(false);
  const [episodePrice, setEpisodePrice] = useState("");
  const [searchValue, setSearchValue] = useState("");
  // 포스트 탭과 작품 연재 탭의 선택 작품을 분리
  const [selectedPostWorkId, setSelectedPostWorkId] = useState<
    string | undefined
  >(undefined);
  const [selectedEpisodeWorkId, setSelectedEpisodeWorkId] = useState<
    string | undefined
  >(undefined);
  const [categoryTab, setCategoryTab] = useState<"내 작품" | "원작">("내 작품");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDraftId, setSelectedDraftId] = useState<number | null>(null);
  const [sidebarVariant, setSidebarVariant] = useState<
    "post-type" | "series-type" | "guideline"
  >("post-type");
  const [isPublishing, setIsPublishing] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const [isDraftListOpen, setIsDraftListOpen] = useState(false);

  // API Hooks
  const { mutate: createPost } = useCreatePost();
  const { mutate: saveDraft } = useSaveDraft();
  const { data: allDrafts } = useGetAllDrafts();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: uploadImage } = useUploadWorkImage();
  // TODO: /api/mypage/works 엔드포인트가 없어서 전체 작품 목록 조회 사용
  const { data: myWorks } = useGetAllWorks();
  const { data: searchResults } = useSearch(searchValue);
  // 현재 탭에 따라 선택된 작품 ID 결정
  const selectedSeriesId = postSelected
    ? selectedPostWorkId
    : selectedEpisodeWorkId;

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
    // 탭 변경 시 선택된 작품 초기화 (선택사항)
    // setSelectedPostWorkId(undefined);
    // setSelectedEpisodeWorkId(undefined);
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
      // 현재 탭에 따라 다른 상태 업데이트
      if (postSelected) {
        setSelectedPostWorkId(selectedId);
      } else {
        setSelectedEpisodeWorkId(selectedId);
      }
    },
    [series, postSelected],
  );

  const onWorkSelect = useCallback(
    (work: WorkResponseDto) => {
      const workId = String(work.id);
      // 현재 탭에 따라 다른 상태 업데이트
      if (postSelected) {
        setSelectedPostWorkId(workId);
      } else {
        setSelectedEpisodeWorkId(workId);
      }
    },
    [postSelected],
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
    // 임시저장 목록 모달 표시
    setIsDraftListOpen(true);
  }, []);

  const onSelectDraft = useCallback((draft: PostResponseDto) => {
    setSelectedDraftId(draft.id);
    setTitle(draft.title || "");
    setContent(draft.content || "");
    if (draft.workId) {
      const workId = String(draft.workId);
      if (draft.postType === "EPISODE") {
        setSelectedEpisodeWorkId(workId);
        setPostSelected(false);
      } else {
        setSelectedPostWorkId(workId);
        setPostSelected(true);
      }
    } else {
      if (draft.postType === "EPISODE") {
        setPostSelected(false);
      } else {
        setPostSelected(true);
      }
    }
    if (draft.isPaid && draft.price) {
      setPaidPost(true);
      setEpisodePrice(String(draft.price));
    }
    if (draft.tags) {
      setTags(draft.tags);
    }
  }, []);

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
      workId: postSelected
        ? selectedPostWorkId
          ? Number(selectedPostWorkId)
          : undefined
        : selectedEpisodeWorkId
          ? Number(selectedEpisodeWorkId)
          : undefined,
      status: "DRAFT",
      isPaid: paidPost,
      price: paidPost && episodePrice ? Number(episodePrice) : undefined,
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
    selectedPostWorkId,
    selectedEpisodeWorkId,
    selectedDraftId,
    paidPost,
    episodePrice,
    saveDraft,
    updatePost,
  ]);

  // 포스트 발행 (EditorHeader의 "발행하기" 버튼)
  const onPublish = useCallback(() => {
    if (isPublishing) return; // 이미 발행 중이면 무시

    if (!title.trim() || !content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    // 원작 설정 필수 검증 (포스트 탭일 때만)
    if (postSelected && !selectedPostWorkId) {
      toast.error("원작 작품을 선택해주세요.");
      return;
    }

    // 작품 연재 탭일 때는 작품 선택 필수
    if (!postSelected && !selectedEpisodeWorkId) {
      toast.error("연재할 작품을 선택해주세요.");
      return;
    }

    setIsPublishing(true);

    const postData: PostRequestDto = {
      title,
      content,
      postType: postSelected ? "POST" : "EPISODE",
      creationType: variant === "secondary-post" ? "DERIVATIVE" : "ORIGINAL",
      workId: postSelected
        ? selectedPostWorkId
          ? Number(selectedPostWorkId)
          : undefined
        : selectedEpisodeWorkId
          ? Number(selectedEpisodeWorkId)
          : undefined,
      status: "PUBLISHED",
      isPaid: paidPost,
      price: paidPost && episodePrice ? Number(episodePrice) : undefined,
    };

    createPost(postData, {
      onSuccess: () => {
        setIsPublishing(false);
        toast.success("포스트가 발행되었습니다.");
        navigateBack();
      },
      onError: (error: unknown) => {
        setIsPublishing(false);
        // AI 검수 실패 시 특별 처리 (400 코드로 message 필드로 반환)
        let errorMessage = "포스트 발행에 실패했습니다.";
        let statusCode: number | undefined;

        // axios 에러인지 확인
        if (axios.isAxiosError(error)) {
          statusCode = error.response?.status;
          const responseData = error.response?.data;

          // BaseResponse 형식인 경우 (message 필드가 있음)
          if (
            responseData &&
            typeof responseData === "object" &&
            "message" in responseData
          ) {
            errorMessage =
              (responseData as { message?: string }).message || errorMessage;
          } else if (typeof responseData === "string") {
            // 문자열로 직접 반환된 경우
            errorMessage = responseData;
          } else if (error.message) {
            // axios 에러 메시지
            errorMessage = error.message;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        // 400 코드인 경우 발행 반려 팝업 표시
        if (statusCode === 400) {
          setRejectionMessage(errorMessage);
        } else {
          toast.error(errorMessage);
        }
      },
    });
  }, [
    isPublishing,
    title,
    content,
    postSelected,
    variant,
    selectedSeriesId,
    paidPost,
    episodePrice,
    createPost,
    navigateBack,
  ]);

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
            // 이미지 URL을 contentEditable에 <img> 태그로 삽입
            const insertImage = (
              window as Window & {
                __insertImageAtCursor?: (imageUrl: string) => void;
              }
            ).__insertImageAtCursor;
            if (insertImage && typeof insertImage === "function") {
              insertImage(imageUrl);
              toast.success("이미지가 업로드되었습니다.");
            } else {
              // Fallback: HTML 문자열로 추가
              const imageHtml = `<img src="${imageUrl}" style="max-width: 100%; height: auto; display: block; margin: 16px 0;" draggable="true" data-drag-id="img-${Date.now()}" />`;
              setContent((prev) => (prev ? prev + imageHtml : imageHtml));
              toast.success("이미지가 업로드되었습니다.");
            }
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
    if (!selectedSeriesId) {
      toast.error("작품을 먼저 선택해주세요.");
      return;
    }
    setSidebarVariant("guideline");
    setSidebarOpen(true);
  }, [selectedSeriesId]);

  return (
    <>
      <EditorView
        title={title}
        content={content}
        postSelected={postSelected}
        tags={tags}
        paidPost={paidPost}
        episodePrice={episodePrice}
        searchValue={searchValue}
        series={series}
        categoryTab={categoryTab}
        sidebarOpen={sidebarOpen}
        sidebarVariant={sidebarVariant}
        editorVariant={variant}
        onTitleChange={onTitleChange}
        onContentChange={onContentChange}
        onPostChange={onPostChange}
        onPaidPostChange={onPaidPostChange}
        onEpisodePriceChange={onEpisodePriceChange}
        onSearchChange={onSearchChange}
        onSeriesSelect={onSeriesSelect}
        onWorkSelect={onWorkSelect}
        selectedPostWorkId={selectedPostWorkId}
        selectedEpisodeWorkId={selectedEpisodeWorkId}
        originalWorkId={
          postSelected && categoryTab === "원작" && selectedPostWorkId
            ? Number(selectedPostWorkId)
            : undefined
        }
        onAddSeries={onAddSeries}
        onCategoryTabChange={onCategoryTabChange}
        onBack={onBack}
        onLoad={onLoad}
        onSave={onSave}
        onSettle={onPublish}
        onAddImage={onAddImage}
        isPublishing={isPublishing}
        onSidebarClose={onSidebarClose}
        onPostClick={onPostClick}
        onGuidelineClick={onGuidelineClick}
        onTagsChange={onTagsChange}
        showPublish={!!selectedSeriesId}
        showGuideline={!!selectedSeriesId}
      />
      <RejectionPopup
        isOpen={rejectionMessage !== null}
        message={rejectionMessage || ""}
        onClose={() => setRejectionMessage(null)}
      />
      <DraftListPopup
        isOpen={isDraftListOpen}
        drafts={allDrafts || []}
        onClose={() => setIsDraftListOpen(false)}
        onSelectDraft={onSelectDraft}
      />
    </>
  );
};

export default Editor;
