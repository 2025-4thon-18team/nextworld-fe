import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TextAreaInputList } from "./TextAreaInputList";

const meta = {
  title: "Components/TextAreaInputList",
  component: TextAreaInputList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextAreaInputList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    title: "관계 측면",
    textAreas: ["", ""],
  },
};

export const Expanded: Story = {
  render: (args) => {
    const Component = TextAreaInputList;
    // Use a wrapper to control initial state
    const Wrapper = () => {
      const [textAreas, setTextAreas] = React.useState(["", ""]);
      return (
        <Component
          {...args}
          textAreas={textAreas}
          onTextAreasChange={setTextAreas}
        />
      );
    };
    return <Wrapper />;
  },
  args: {
    title: "관계 측면",
  },
};

export const WithContent: Story = {
  args: {
    title: "관계 측면",
    textAreas: ["첫 번째 내용입니다.", "두 번째 내용입니다."],
  },
};
