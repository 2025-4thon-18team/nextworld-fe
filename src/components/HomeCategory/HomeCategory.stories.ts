import type { Meta, StoryObj } from "@storybook/react";
import { HomeCategory } from "./HomeCategory";

const meta = {
  title: "Components/HomeCategory",
  component: HomeCategory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HomeCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    activeTab: "홈",
    onTabChange: () => {},
  },
};

export const New: Story = {
  args: {
    activeTab: "신규",
    onTabChange: () => {},
  },
};

export const Interest: Story = {
  args: {
    activeTab: "관심",
    onTabChange: () => {},
  },
};

