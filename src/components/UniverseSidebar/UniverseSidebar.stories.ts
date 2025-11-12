import type { Meta, StoryObj } from "@storybook/react";
import { UniverseSidebar } from "./UniverseSidebar";

const meta = {
  title: "Components/UniverseSidebar",
  component: UniverseSidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UniverseSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "세계관 설정",
    myWorkSelected: true,
    content:
      "내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드내용측면에서 쓴 글드",
  },
};

