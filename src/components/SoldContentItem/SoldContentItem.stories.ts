import type { Meta, StoryObj } from "@storybook/react";
import { SoldContentItem } from "./SoldContentItem";

const meta = {
  title: "Components/SoldContentItem",
  component: SoldContentItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SoldContentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contentTitle: "창작물명 창작물명 창작물명 창작물명",
    buyer: "naooung",
    points: 100,
    date: "2025.10.23",
  },
};

export const LongTitle: Story = {
  args: {
    contentTitle: "매우 긴 창작물명이 들어가는 경우입니다",
    buyer: "user123",
    points: 500,
    date: "2025.11.01",
  },
};
