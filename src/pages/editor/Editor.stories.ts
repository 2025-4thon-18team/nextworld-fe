import type { Meta, StoryObj } from "@storybook/react";
import Editor from "./Editor";

const meta = {
  title: "Pages/Editor",
  component: Editor,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

