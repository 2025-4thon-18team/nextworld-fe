import type { Meta, StoryObj } from "@storybook/react";
import { RightSidebar } from "./RightSidebar";

const meta = {
  title: "Components/RightSidebar",
  component: RightSidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["post-type", "guide-line", "universe-rule", "payment-model"],
    },
  },
} satisfies Meta<typeof RightSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostType: Story = {
  args: {
    variant: "post-type",
    title: "창작 유형",
    originalSelected: false,
    series: [
      { imageUrl: "https://via.placeholder.com/150x225", title: "[작품 제목]" },
      { imageUrl: "https://via.placeholder.com/150x225", title: "[작품 제목]" },
    ],
  },
};

export const GuideLine: Story = {
  args: {
    variant: "guide-line",
    title: "작품 가이드라인",
    myWorkSelected: true,
    sections: [
      {
        title: "내용",
        content:
          "내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드",
      },
      {
        title: "캐릭터",
        content:
          "내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드",
      },
      {
        title: "배경",
        content:
          "내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드",
      },
    ],
  },
};

export const UniverseRule: Story = {
  args: {
    variant: "universe-rule",
    title: "세계관 설정집",
    myWorkSelected: true,
    content:
      "내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드",
  },
};

export const PaymentModel: Story = {
  args: {
    variant: "payment-model",
    title: "정산 모델",
  },
};

