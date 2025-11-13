import type { Meta, StoryObj } from "@storybook/react";
import { SeriesCardSmall } from "./SeriesCardSmall";

const meta = {
  title: "Components/SeriesCardSmall",
  component: SeriesCardSmall,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SeriesCardSmall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: "https://placehold.co/150x225",
    title: "[작품 제목]",
  },
};

export const LongTitle: Story = {
  args: {
    imageUrl: "https://placehold.co/150x225",
    title: "매우 긴 작품 제목이 들어가는 경우입니다",
  },
};
