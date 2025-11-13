import type { Meta, StoryObj } from "@storybook/react";
import { AddSeries } from "./AddSeries";

const meta = {
  title: "Components/AddSeries",
  component: AddSeries,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AddSeries>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

