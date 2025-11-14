import { FC, useState } from "react";
import { IconComment, IconCross } from "@/assets/icons";
import { useGetComments, useCreateComment } from "@/querys/useComments";
import type { CreateCommentRequest } from "@/querys/types";
import { cn, buildCommentTree, type Comment } from "@/utils";
import { toast } from "sonner";

interface CommentPopupProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentPopup: FC<CommentPopupProps> = ({
  postId,
  isOpen,
  onClose,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<Record<number, string>>({});
  const { data: comments = [], refetch } = useGetComments(postId);
  const { mutate: createComment, isPending } = useCreateComment();

  // 댓글 트리 구조로 변환
  const commentTree = buildCommentTree(comments);

  const handleSubmit = () => {
    if (!commentContent.trim()) return;

    const commentData: CreateCommentRequest = {
      content: commentContent.trim(),
      parentCommentId: null,
    };

    createComment(
      { postId, data: commentData },
      {
        onSuccess: () => {
          setCommentContent("");
          refetch();
        },
        onError: () => {
          toast("댓글 작성에 실패했습니다.");
        },
      },
    );
  };

  const handleReplySubmit = (parentCommentId: number) => {
    const content = replyContent[parentCommentId]?.trim();
    if (!content) return;

    const commentData: CreateCommentRequest = {
      content,
      parentCommentId,
    };

    createComment(
      { postId, data: commentData },
      {
        onSuccess: () => {
          setReplyContent((prev) => {
            const next = { ...prev };
            delete next[parentCommentId];
            return next;
          });
          setReplyingToId(null);
          refetch();
        },
        onError: () => {
          toast("대댓글 작성에 실패했습니다.");
        },
      },
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString("ko-KR");
  };

  if (!isOpen) return null;

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
          <div className="gap-xs flex items-center">
            <IconComment className="size-24 text-black" />
            <h2 className="text-headings-heading-3 text-black">댓글</h2>
            <span className="text-body-medium text-muted">
              ({comments.length})
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-xs hover:bg-background-muted flex items-center justify-center rounded-md"
          >
            <IconCross className="size-24 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="flex max-h-[calc(80vh-200px)] flex-col">
          {/* Comments List */}
          <div className="px-xl py-lg flex-1 overflow-y-auto">
            {commentTree.length === 0 ? (
              <div className="py-xl text-center">
                <p className="text-body-medium text-text-muted">
                  아직 댓글이 없습니다.
                </p>
              </div>
            ) : (
              <div className="gap-lg flex flex-col">
                {commentTree.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    formatDate={formatDate}
                    replyingToId={replyingToId}
                    setReplyingToId={setReplyingToId}
                    replyContent={replyContent}
                    setReplyContent={setReplyContent}
                    onReplySubmit={handleReplySubmit}
                    postId={postId}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Comment Input */}
          <div className="border-default px-xl py-lg border-t">
            <div className="gap-md flex flex-col">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="border-default px-md py-md text-body-regular placeholder:text-text-muted focus:border-accent resize-none rounded-md border text-black focus:outline-none"
                rows={3}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!commentContent.trim() || isPending}
                  className={cn(
                    "px-lg py-sm text-body-medium rounded-md",
                    commentContent.trim() && !isPending
                      ? "bg-foreground-default hover:bg-foreground-500 text-white"
                      : "bg-grayscale-g2 text-text-muted cursor-not-allowed",
                  )}
                >
                  {isPending ? "작성 중..." : "작성"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface CommentItemProps {
  comment: Comment;
  formatDate: (dateString: string) => string;
  replyingToId: number | null;
  setReplyingToId: (id: number | null) => void;
  replyContent: Record<number, string>;
  setReplyContent: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  onReplySubmit: (parentCommentId: number) => void;
  postId: number;
}

const CommentItem: FC<CommentItemProps> = ({
  comment,
  formatDate,
  replyingToId,
  setReplyingToId,
  replyContent,
  setReplyContent,
  onReplySubmit,
  postId,
}) => {
  const isReplying = replyingToId === comment.id;
  const currentReplyContent = replyContent[comment.id] || "";

  const handleReplyClick = () => {
    setReplyingToId(isReplying ? null : comment.id);
    if (!isReplying) {
      setReplyContent((prev) => ({ ...prev, [comment.id]: "" }));
    }
  };

  const handleReplyChange = (value: string) => {
    setReplyContent((prev) => ({ ...prev, [comment.id]: value }));
  };

  const handleReplySubmitClick = () => {
    onReplySubmit(comment.id);
  };

  return (
    <div className="gap-md flex flex-col">
      {/* 댓글 본문 */}
      <div className="gap-md flex items-start">
        <div className="bg-grayscale-g2 flex size-40 shrink-0 items-center justify-center rounded-full">
          <span className="text-body-small-medium text-grayscale-g5">
            {comment.authorName.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <div className="gap-xs flex items-center">
            <span className="text-body-medium text-black">
              {comment.authorName}
            </span>
            <span className="text-body-small-regular text-text-muted">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="text-body-regular text-black">{comment.content}</p>
          <button
            type="button"
            onClick={handleReplyClick}
            className="mt-xs text-body-small-medium text-text-muted hover:text-black"
          >
            {isReplying ? "취소" : "답글"}
          </button>
        </div>
      </div>

      {/* 대댓글 입력 폼 */}
      {isReplying && (
        <div className="gap-md ml-48 flex flex-col">
          <textarea
            value={currentReplyContent}
            onChange={(e) => handleReplyChange(e.target.value)}
            placeholder="대댓글을 입력하세요..."
            className="border-default px-md py-md text-body-regular placeholder:text-muted focus:border-accent resize-none rounded-md border text-black focus:outline-none"
            rows={2}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleReplySubmitClick}
              disabled={!currentReplyContent.trim()}
              className={cn(
                "px-md py-xs text-body-small-medium rounded-md",
                currentReplyContent.trim()
                  ? "bg-foreground-default hover:bg-foreground-500 text-white"
                  : "bg-grayscale-g2 text-muted cursor-not-allowed",
              )}
            >
              작성
            </button>
          </div>
        </div>
      )}

      {/* 대댓글 목록 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="gap-md border-default pl-md ml-48 flex flex-col border-l">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              formatDate={formatDate}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              onReplySubmit={onReplySubmit}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
