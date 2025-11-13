import type { Meta, StoryObj } from "@storybook/react";
import { OriginalSeriesBanner } from "./OriginalSeriesBanner";

const meta = {
  title: "Components/OriginalSeriesBanner",
  component: OriginalSeriesBanner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OriginalSeriesBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: "https://placehold.co/50x75",
    label: "이 유니버스의 '원작' 보기",
    title: "은해상단 막내아들",
  },
};

export const LongTitle: Story = {
  args: {
    imageUrl: "https://placehold.co/50x75",
    label: "이 유니버스의 '원작' 보기",
    title: "매우 긴 원작 시리즈 제목이 들어가는 경우입니다",
  },
};
