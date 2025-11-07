import type { Meta, StoryObj } from "@storybook/react";
import { ContentItem } from "./ContentItem";

const meta = {
  title: "Components/Article/ContentItem",
  component: ContentItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "제목제목",
    points: 100,
    rating: 4.4,
    views: 44,
    comments: 44,
    date: "2025.10.01",
  },
};

export const LongTitle: Story = {
  args: {
    title: "긴 제목이 있는 콘텐츠 아이템 예시입니다",
    points: 250,
    rating: 4.8,
    views: 120,
    comments: 25,
    date: "2025.11.07",
  },
};
