import type { Meta, StoryObj } from "@storybook/react";
import { Point } from "./Point";

const meta = {
  title: "Components/Point",
  component: Point,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Point>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutPrefix: Story = {
  args: {
    value: 100,
    showPrefix: false,
  },
};

export const WithPlusPrefix: Story = {
  args: {
    value: 100,
    showPrefix: true,
    prefix: "+",
  },
};

export const WithMinusPrefix: Story = {
  args: {
    value: 100,
    showPrefix: true,
    prefix: "-",
  },
};

export const LargeValue: Story = {
  args: {
    value: 10000,
    showPrefix: true,
    prefix: "+",
  },
};
