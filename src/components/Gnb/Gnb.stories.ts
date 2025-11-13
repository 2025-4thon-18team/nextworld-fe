import type { Meta, StoryObj } from "@storybook/react";
import { Gnb } from "./Gnb";

const meta = {
  title: "Components/Gnb",
  component: Gnb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    activeMenu: {
      control: "select",
      options: ["홈", "작품", "포스트"],
    },
  },
} satisfies Meta<typeof Gnb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeMenu: "홈",
    userImages: ["https://placehold.co/50", "https://placehold.co/50"],
  },
};

export const ActiveWork: Story = {
  args: {
    activeMenu: "작품",
    userImages: ["https://placehold.co/50", "https://placehold.co/50"],
  },
};

export const ActivePost: Story = {
  args: {
    activeMenu: "포스트",
    userImages: ["https://placehold.co/50", "https://placehold.co/50"],
  },
};

export const NoUserImages: Story = {
  args: {
    activeMenu: "홈",
  },
};
