import type { Meta, StoryObj } from "@storybook/react";
import { ArticleInfo } from "./ArticleInfo";

const meta = {
  title: "Components/Article/ArticleInfo",
  component: ArticleInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArticleInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 4.5,
    views: 100,
    comments: 10,
    date: "2021-01-01",
  },
};
