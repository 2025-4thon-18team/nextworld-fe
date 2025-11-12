import type { Meta, StoryObj } from "@storybook/react";
import Login from "./Login";

const meta = {
  title: "Pages/Auth/Login",
  component: Login,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

