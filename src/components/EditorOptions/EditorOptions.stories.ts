import type { Meta, StoryObj } from "@storybook/react";
import { EditorOptions } from "./EditorOptions";

const meta = {
  title: "Components/EditorOptions",
  component: EditorOptions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["post", "series", "post-with-settlement"],
    },
  },
} satisfies Meta<typeof EditorOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Post: Story = {
  args: {
    variant: "post",
  },
};

export const Series: Story = {
  args: {
    variant: "series",
    seriesTitle: "[작품 제목]",
  },
};

export const PostWithSettlement: Story = {
  args: {
    variant: "post-with-settlement",
  },
};

