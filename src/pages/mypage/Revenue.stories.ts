import type { Meta, StoryObj } from "@storybook/react";
import Revenue from "./Revenue";

const meta = {
  title: "Pages/MyPage/Revenue",
  component: Revenue,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Revenue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: "대시보드 탭이 활성화된 상태",
      },
    },
  },
};

export const SalesHistory: Story = {
  parameters: {
    docs: {
      description: {
        story: "판매내역 탭이 활성화된 상태",
      },
    },
  },
};

