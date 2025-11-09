import type { Meta, StoryObj } from "@storybook/react";
import { InputLabel, TextInput, TextArea } from "./Input";

// InputLabel Stories
const labelMeta = {
  title: "Components/Input/InputLabel",
  component: InputLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof InputLabel>;

export default labelMeta;
type LabelStory = StoryObj<typeof labelMeta>;

export const Label: LabelStory = {
  args: {
    children: "이름",
    required: false,
  },
};

export const LabelRequired: LabelStory = {
  args: {
    children: "이름",
    required: true,
  },
};

// TextInput Stories
const inputMeta = {
  title: "Components/Input/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextInput>;

export { inputMeta as TextInputMeta };
type InputStory = StoryObj<typeof inputMeta>;

export const Input: InputStory = {
  args: {
    placeholder: "김나경",
    className: "w-810",
  },
};

// TextArea Stories
const textareaMeta = {
  title: "Components/Input/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextArea>;

export { textareaMeta as TextAreaMeta };
type TextAreaStory = StoryObj<typeof textareaMeta>;

export const Area: TextAreaStory = {
  args: {
    placeholder: "김나경",
    className: "w-810",
  },
};
