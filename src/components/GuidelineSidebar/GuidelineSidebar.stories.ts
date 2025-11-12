import type { Meta, StoryObj } from "@storybook/react";
import { GuidelineSidebar } from "./GuidelineSidebar";

const meta = {
  title: "Components/GuidelineSidebar",
  component: GuidelineSidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GuidelineSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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

