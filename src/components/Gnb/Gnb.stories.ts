import type { Meta, StoryObj } from "@storybook/react";
import { Gnb } from "./Gnb";

const meta = {
  title: "Components/Gnb",
  component: Gnb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Gnb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAuthorized: false,
  },
};

export const Authorized: Story = {
  args: {
    isAuthorized: true,
    profileImageUrl: "https://placehold.co/50",
  },
};
