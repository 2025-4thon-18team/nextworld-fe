import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "accent", "muted", "subtle"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "정산하기",
    variant: "default",
  },
};

export const Accent: Story = {
  args: {
    children: "정산하기",
    variant: "accent",
  },
};

export const Muted: Story = {
  args: {
    children: "정산하기",
    variant: "muted",
  },
};

export const Subtle: Story = {
  args: {
    children: "정산하기",
    variant: "subtle",
  },
};
