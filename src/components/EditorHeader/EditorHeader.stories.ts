import type { Meta, StoryObj } from "@storybook/react";
import { EditorHeader } from "./EditorHeader";

const meta = {
  title: "Components/EditorHeader",
  component: EditorHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EditorHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBack: () => {},
    onLoad: () => {},
    onSave: () => {},
    onSettle: () => {},
    onAddImage: () => {},
    editorOptionsVariant: "post-with-settlement",
  },
};

export const Series: Story = {
  args: {
    onBack: () => {},
    onLoad: () => {},
    onSave: () => {},
    onSettle: () => {},
    onAddImage: () => {},
    editorOptionsVariant: "series",
    seriesTitle: "[작품 제목]",
  },
};

