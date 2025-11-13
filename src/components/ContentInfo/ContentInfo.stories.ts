import type { Meta, StoryObj } from "@storybook/react";
import { ContentInfo } from "./ContentInfo";

const meta = {
  title: "Components/ContentInfo",
  component: ContentInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContentInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: "장르 | 자유 연재",
    rating: 4.4,
    views: 44,
    isSerializing: true,
    tags: ["현대로맨스", "능력여주", "황제"],
    likes: 33,
    onLike: () => {},
    onInterest: () => {},
    onShare: () => {},
  },
};

