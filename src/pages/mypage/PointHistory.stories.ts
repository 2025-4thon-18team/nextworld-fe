import type { Meta, StoryObj } from "@storybook/react";
import PointHistory from "./PointHistory";

const meta = {
  title: "Pages/MyPage/PointHistory",
  component: PointHistory,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PointHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ChargeHistory: Story = {
  parameters: {
    docs: {
      description: {
        story: "충전 내역 탭이 활성화된 상태",
      },
    },
  },
};

export const UsageHistory: Story = {
  parameters: {
    docs: {
      description: {
        story: "사용 내역 탭이 활성화된 상태",
      },
    },
  },
};

