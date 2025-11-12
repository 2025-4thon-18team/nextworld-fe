import type { Meta, StoryObj } from "@storybook/react";
import CreateSeriesBasic from "./CreateSeriesBasic";

const meta = {
  title: "Pages/CreateSeries/CreateSeriesBasic",
  component: CreateSeriesBasic,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreateSeriesBasic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

