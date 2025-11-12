import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "./Search";

const meta = {
  title: "Components/Search",
  component: Search,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "검색어를 입력하세요",
  },
};

export const WithValue: Story = {
  args: {
    value: "asdafsf",
    placeholder: "검색어를 입력하세요",
  },
};

