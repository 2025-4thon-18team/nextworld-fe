import type { Meta, StoryObj } from "@storybook/react";
import { TagList } from "./TagList";

const meta = {
  title: "Components/TagList",
  component: TagList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: ["현대로맨스", "현대로맨스", "현대로맨스"],
  },
};

export const SingleTag: Story = {
  args: {
    tags: ["현대로맨스"],
  },
};

export const ManyTags: Story = {
  args: {
    tags: [
      "현대로맨스",
      "현대로맨스",
      "현대로맨스",
      "현대로맨스",
      "현대로맨스",
    ],
  },
};
