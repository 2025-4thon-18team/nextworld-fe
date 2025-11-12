import type { Meta, StoryObj } from "@storybook/react";
import { SeriesCard } from "./SeriesCard";

const meta = {
  title: "Components/SeriesCard",
  component: SeriesCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SeriesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/150x225",
    title: "[작품 제목]",
    tags: ["현대로맨스", "현대로맨스"],
  },
};

export const SingleTag: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/150x225",
    title: "[작품 제목]",
    tags: ["현대로맨스"],
  },
};

export const ManyTags: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/150x225",
    title: "[작품 제목]",
    tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
  },
};

export const NoTags: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/150x225",
    title: "[작품 제목]",
    tags: [],
  },
};
