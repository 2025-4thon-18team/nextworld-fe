import type { Meta, StoryObj } from "@storybook/react-vite";
import { SeriesInfo } from "./SeriesInfo";

const meta = {
  title: "Components/SeriesInfo",
  component: SeriesInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SeriesInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: "장르 | 자유 연재 | 2차 창작 카테고리",
    rating: 4.4,
    views: 44,
    schedule: "매주 월요일",
    isSerializing: true,
    tags: ["현대로맨스", "능력여주", "황제"],
    likes: 33,
  },
};

export const Completed: Story = {
  args: {
    category: "장르 | 완결 | 오리지널",
    rating: 4.8,
    views: 120,
    schedule: null,
    isSerializing: false,
    tags: ["판타지", "로맨스"],
    likes: 50,
  },
};
