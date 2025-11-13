import type { Meta, StoryObj } from "@storybook/react";
import { ViewerHeader } from "./ViewerHeader";

const meta = {
  title: "Components/Viewer/ViewerHeader",
  component: ViewerHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ViewerHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSeriesTitle: Story = {
  args: {
    seriesTitle: "[작품명]",
    episodeTitle: "제목제목제목제목",
  },
};

export const WithoutSeriesTitle: Story = {
  args: {
    episodeTitle: "제목제목제목제목",
  },
};

export const LongTitles: Story = {
  args: {
    seriesTitle: "매우 긴 작품명이 들어가는 경우입니다",
    episodeTitle: "매우 긴 에피소드 제목이 들어가는 경우입니다",
  },
};
