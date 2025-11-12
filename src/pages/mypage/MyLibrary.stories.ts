import type { Meta, StoryObj } from "@storybook/react";
import MyLibrary from "./MyLibrary";

const meta = {
  title: "Pages/MyPage/MyLibrary",
  component: MyLibrary,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MyLibrary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

