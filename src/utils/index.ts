import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "fontSizes-xs",
        "fontSizes-sm",
        "fontSizes-md",
        "fontSizes-lg",
        "fontSizes-xl",
        "fontSizes-2xl"
      ],
      "border-w": [{ border: ["sm", "md"] }],
      "border-w-x": [{ "border-x": ["sm", "md"] }],
      "border-w-y": [{ "border-y": ["sm", "md"] }],
      "border-w-t": [{ "border-t": ["sm", "md"] }],
      "border-w-r": [{ "border-r": ["sm", "md"] }],
      "border-w-b": [{ "border-b": ["sm", "md"] }],
      "border-w-l": [{ "border-l": ["sm", "md"] }],
      rounded: [{ rounded: ["sm", "md", "lg", "full"] }],
      "rounded-t": [{ "rounded-t": ["sm", "md", "lg", "full"] }],
      "rounded-r": [{ "rounded-r": ["sm", "md", "lg", "full"] }],
      "rounded-b": [{ "rounded-b": ["sm", "md", "lg", "full"] }],
      "rounded-l": [{ "rounded-l": ["sm", "md", "lg", "full"] }],
      "rounded-tl": [{ "rounded-tl": ["sm", "md", "lg", "full"] }],
      "rounded-tr": [{ "rounded-tr": ["sm", "md", "lg", "full"] }],
      "rounded-br": [{ "rounded-br": ["sm", "md", "lg", "full"] }],
      "rounded-bl": [{ "rounded-bl": ["sm", "md", "lg", "full"] }],
      gap: [{ gap: ["xs", "sm", "md", "lg", "xl"] }],
      "gap-x": [{ "gap-x": ["xs", "sm", "md", "lg", "xl"] }],
      "gap-y": [{ "gap-y": ["xs", "sm", "md", "lg", "xl"] }],
      p: [{ p: ["xs", "sm", "md", "lg", "xl"] }],
      px: [{ px: ["xs", "sm", "md", "lg", "xl"] }],
      py: [{ py: ["xs", "sm", "md", "lg", "xl"] }],
      pt: [{ pt: ["xs", "sm", "md", "lg", "xl"] }],
      pr: [{ pr: ["xs", "sm", "md", "lg", "xl"] }],
      pb: [{ pb: ["xs", "sm", "md", "lg", "xl"] }],
      pl: [{ pl: ["xs", "sm", "md", "lg", "xl"] }],
      m: [{ m: ["xs", "sm", "md", "lg", "xl"] }],
      mx: [{ mx: ["xs", "sm", "md", "lg", "xl"] }],
      my: [{ my: ["xs", "sm", "md", "lg", "xl"] }],
      mt: [{ mt: ["xs", "sm", "md", "lg", "xl"] }],
      mr: [{ mr: ["xs", "sm", "md", "lg", "xl"] }],
      mb: [{ mb: ["xs", "sm", "md", "lg", "xl"] }],
      ml: [{ ml: ["xs", "sm", "md", "lg", "xl"] }]
    }
  }
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

interface Comment {
  commentId: number;
  authorId: number;
  authorUsername: string;
  parentCommentId: number | null;
  content: string;
  createdAt: string;
  profileImageUrl?: string;
  replies?: Comment[];
}

export interface CommentResponse {
  commentId: number;
  authorId: number;
  authorUsername: string;
  parentCommentId: number;
  content: string;
  createdAt: string;
  profileImageUrl?: string;
  distance?: string;
  replies?: CommentResponse[];
}

export function buildCommentTree(comments: CommentResponse[]) {
  const map: Record<number, Comment> = {};
  const roots: Comment[] = [];

  comments.forEach((comment) => {
    map[comment.commentId] = { ...comment, replies: [] };
  });

  comments.forEach((comment) => {
    if (comment.parentCommentId !== null) {
      map[comment.parentCommentId]?.replies?.push(map[comment.commentId]);
    } else {
      roots.push(map[comment.commentId]);
    }
  });

  return roots;
}
