import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./RadioButton";

const meta = {
  title: "Components/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "유니버스",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    children: "회차",
    selected: true,
  },
};

export const ButtonGroup: Story = {
  args: {
    children: "회차",
    selected: false,
  },
  render: (args) => {
    return (
      <div className="flex gap-2">
        <RadioButton selected={true}>회차</RadioButton>
        <RadioButton selected={false}>유니버스</RadioButton>
      </div>
    );
  },
};
