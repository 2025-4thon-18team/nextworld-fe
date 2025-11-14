import type { Meta, StoryObj } from "@storybook/react";
import { CategoryTabs } from "./CategoryTabs";

const meta = {
  title: "Components/CategoryTabs",
  component: CategoryTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CategoryTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    variant: "home",
    activeTab: "홈",
    onTabChange: () => {},
  },
};

export const New: Story = {
  args: {
    variant: "home",
    activeTab: "신규",
    onTabChange: () => {},
  },
};

export const Interest: Story = {
  args: {
    variant: "home",
    activeTab: "관심",
    onTabChange: () => {},
  },
};

export const Guideline: Story = {
  args: {
    variant: "guideline",
    activeTab: "내 작품",
    onTabChange: () => {},
  },
};

export const PostType: Story = {
  args: {
    variant: "post-type",
    activeTab: "포스트",
    onTabChange: () => {},
  },
};

export const SeriesType: Story = {
  args: {
    variant: "post-type",
    activeTab: "작품 연재",
    onTabChange: () => {},
  },
};
