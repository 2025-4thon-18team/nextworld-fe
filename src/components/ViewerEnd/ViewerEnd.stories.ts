import type { Meta, StoryObj } from "@storybook/react";
import { ViewerEnd } from "./ViewerEnd";

const meta = {
  title: "Components/Viewer/ViewerEnd",
  component: ViewerEnd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ViewerEnd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    authorName: "작가명",
    rating: 4.5,
    commentsLabel: "댓글",
  },
};

export const WithoutRating: Story = {
  args: {
    authorName: "작가명",
    commentsLabel: "댓글",
  },
};

export const LongAuthorName: Story = {
  args: {
    authorName: "매우 긴 작가명이 들어가는 경우입니다",
    rating: 4.8,
    commentsLabel: "댓글 123",
  },
};
