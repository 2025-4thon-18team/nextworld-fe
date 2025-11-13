import type { Meta, StoryObj } from "@storybook/react";
import CreateSeriesUniverse from "./CreateSeriesUniverse";

const meta = {
  title: "Pages/CreateSeries/CreateSeriesUniverse",
  component: CreateSeriesUniverse,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreateSeriesUniverse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

