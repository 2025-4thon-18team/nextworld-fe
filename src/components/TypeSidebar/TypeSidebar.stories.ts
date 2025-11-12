import type { Meta, StoryObj } from "@storybook/react";
import { TypeSidebar } from "./TypeSidebar";

const meta = {
  title: "Components/TypeSidebar",
  component: TypeSidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["post", "series"],
    },
  },
} satisfies Meta<typeof TypeSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Post: Story = {
  args: {
    title: "업로드 유형",
    variant: "post",
    postSelected: true,
    tags: ["현대로맨스", "능력여주"],
    allowDerivative: false,
    series: [
      { imageUrl: "https://via.placeholder.com/150x225", title: "[작품 제목]" },
      { imageUrl: "https://via.placeholder.com/150x225", title: "[작품 제목]" },
    ],
  },
};

export const Series: Story = {
  args: {
    title: "업로드 유형",
    variant: "series",
    postSelected: false,
    series: [
      { imageUrl: "https://via.placeholder.com/150x225", title: "[작품 제목]" },
      { imageUrl: "https://via.placeholder.com/150x225", title: "[작품 제목]" },
    ],
  },
};

