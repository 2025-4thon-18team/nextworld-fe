import type { Meta, StoryObj } from "@storybook/react";
import IconWithLabel from "./IconWithLabel";
import {
  IconStar,
  IconEye,
  IconComment,
  IconHeart,
  IconShare,
  IconPoint,
} from "@/assets/icons";

const meta = {
  title: "Components/IconWithLabel",
  component: IconWithLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconWithLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithStar: Story = {
  args: {
    icon: <IconStar className="text-grayscale-g5 size-24" />,
    label: "4.4",
  },
};

export const WithEye: Story = {
  args: {
    icon: <IconEye className="text-grayscale-g5 size-24" />,
    label: "100",
  },
};

export const WithComment: Story = {
  args: {
    icon: <IconComment className="text-grayscale-g5 size-24" />,
    label: "44",
  },
};

export const WithHeart: Story = {
  args: {
    icon: <IconHeart className="text-grayscale-g5 size-24" />,
    label: "좋아요",
  },
};

export const WithShare: Story = {
  args: {
    icon: <IconShare className="text-grayscale-g5 size-24" />,
    label: "공유",
  },
};

export const WithPoint: Story = {
  args: {
    icon: <IconPoint className="size-24" />,
    label: "100",
  },
};

export const CustomLabel: Story = {
  args: {
    icon: <IconStar className="text-foreground-default size-24" />,
    label: "커스텀 레이블",
  },
};
