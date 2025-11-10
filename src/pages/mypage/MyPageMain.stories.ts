import type { Meta, StoryObj } from "@storybook/react";
import MyPageMain from "./MyPageMain";

const meta = {
  title: "Pages/MyPage/MyPageMain",
  component: MyPageMain,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MyPageMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

