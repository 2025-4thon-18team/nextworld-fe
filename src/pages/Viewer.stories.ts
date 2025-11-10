import type { Meta, StoryObj } from "@storybook/react";
import Viewer from "./Viewer";

const meta = {
  title: "Pages/Viewer",
  component: Viewer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Viewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

