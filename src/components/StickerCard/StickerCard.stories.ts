import type { Meta, StoryObj } from "@storybook/react";
import { StickerCard } from "./StickerCard";

const meta = {
  title: "Components/StickerCard",
  component: StickerCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
} satisfies Meta<typeof StickerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children:
      "내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children:
      "내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드",
    variant: "secondary",
  },
};
