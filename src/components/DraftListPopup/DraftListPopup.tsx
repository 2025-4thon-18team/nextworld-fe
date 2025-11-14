import { FC } from "react";
import { IconCross } from "@/assets/icons";
import { useDeleteDraft } from "@/querys/usePosts";
import { useNavigation } from "@/hooks/useNavigation";
import type { PostResponseDto } from "@/querys/types";
import { toast } from "sonner";

interface DraftListPopupProps {
  isOpen: boolean;
  drafts: PostResponseDto[];
  onClose: () => void;
  onSelectDraft: (draft: PostResponseDto) => void;
}

export const DraftListPopup: FC<DraftListPopupProps> = ({
  isOpen,
  drafts,
  onClose,
  onSelectDraft,
}) => {
  const { mutate: deleteDraft } = useDeleteDraft();
  const { navigate } = useNavigation();

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="z-modal bg-grayscale-black bg-opacity-50 fixed inset-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="z-modal fixed top-1/2 left-1/2 max-h-[80vh] w-600 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="border-default px-xl py-lg flex items-center justify-between border-b">
          <h2 className="text-headings-heading-3 text-black">임시저장 목록</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-xs hover:bg-background-muted flex items-center justify-center rounded-md"
          >
            <IconCross className="size-24 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="px-xl py-lg max-h-[calc(80vh-150px)] overflow-y-auto">
          {drafts.length === 0 ? (
            <div className="py-xl text-center">
              <p className="text-body-medium text-text-muted">
                임시저장된 글이 없습니다.
              </p>
            </div>
          ) : (
            <div className="gap-md flex flex-col">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="gap-sm border-default hover:bg-background-muted px-md py-md rounded-md border transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectDraft(draft);
                      onClose();
                    }}
                    className="w-full text-left"
                  >
                    <h3 className="text-headings-heading-3 text-black">
                      {draft.title || "(제목 없음)"}
                    </h3>
                    <p className="text-body-small-regular text-text-muted line-clamp-2">
                      {draft.content.replace(/<[^>]*>/g, "").substring(0, 100)}
                      {draft.content.length > 100 ? "..." : ""}
                    </p>
                    <p className="text-body-small-regular text-text-muted">
                      {formatDate(draft.updatedAt)}
                    </p>
                  </button>
                  <div className="gap-xs flex items-center justify-end mt-sm">
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/editor?draftId=${draft.id}`);
                        onClose();
                      }}
                      className="text-body-small-medium text-text-muted hover:text-black"
                    >
                      수정
                    </button>
                    <span className="text-text-muted">|</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (!confirm("정말 삭제하시겠습니까?")) return;
                        deleteDraft(draft.id, {
                          onSuccess: () => {
                            toast.success("임시저장이 삭제되었습니다.");
                          },
                          onError: () => {
                            toast.error("임시저장 삭제에 실패했습니다.");
                          },
                        });
                      }}
                      className="text-body-small-medium text-text-muted hover:text-black"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

