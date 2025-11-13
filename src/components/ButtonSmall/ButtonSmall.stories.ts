import type { Meta, StoryObj } from "@storybook/react";
import { ButtonSmall } from "./ButtonSmall";

const meta = {
  title: "Components/ButtonSmall",
  component: ButtonSmall,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle"],
    },
  },
} satisfies Meta<typeof ButtonSmall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "정산하기",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    children: "저장",
  },
};

