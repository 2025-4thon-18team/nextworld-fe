import type { Meta, StoryObj } from "@storybook/react";
import { ChargePointItem } from "./ChargePointItem";

const meta = {
  title: "Components/ChargePointItem",
  component: ChargePointItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChargePointItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "포인트 충전",
    date: "2025.10.23 00:00:00",
    points: 100,
  },
};

export const LargeAmount: Story = {
  args: {
    title: "포인트 충전",
    date: "2025.10.23 00:00:00",
    points: 10000,
  },
};
