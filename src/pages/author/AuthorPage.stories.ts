import type { Meta, StoryObj } from "@storybook/react";
import AuthorPage from "./AuthorPage";

const meta = {
  title: "Pages/Author/AuthorPage",
  component: AuthorPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AuthorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

