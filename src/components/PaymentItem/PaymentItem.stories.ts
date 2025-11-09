import type { Meta, StoryObj } from "@storybook/react";
import { PaymentItem } from "./PaymentItem";

const meta = {
  title: "Components/PaymentItem",
  component: PaymentItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["post", "series"],
    },
  },
} satisfies Meta<typeof PaymentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostPayment: Story = {
  args: {
    type: "post",
    title: "포스트명",
    subtitle: "@naooung 구매",
    points: 100,
    date: "2025.10.23",
  },
};

export const SeriesPayment: Story = {
  args: {
    type: "series",
    title: "작품명",
    subtitle: "회차명",
    points: 200,
    date: "2025.10.23",
  },
};

