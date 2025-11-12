import type { Meta, StoryObj } from "@storybook/react";
import { PostItem } from "./PostItem";

const meta = {
  title: "Components/Article/PostItem",
  component: PostItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PostItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "그녀가 웃던 마지막 봄날",
    points: 100,
    content:
      "처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. '이번엔 제발 죽게 해주세요.' ....",
    tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
    rating: 4.4,
    views: 44,
    comments: 44,
    date: "2025.10.01",
  },
};
