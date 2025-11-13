import type { Meta, StoryObj } from "@storybook/react";
import { ProfileImg } from "./ProfileImg";

const meta = {
  title: "Components/ProfileImg",
  component: ProfileImg,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "lg"],
    },
  },
} satisfies Meta<typeof ProfileImg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    imageUrl: undefined,
    size: "sm",
  },
};

export const SmallWithImage: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/36x36",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    imageUrl: undefined,
    size: "lg",
  },
};

export const LargeWithImage: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/120x120",
    size: "lg",
  },
};
