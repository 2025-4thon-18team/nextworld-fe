import type { Meta, StoryObj } from "@storybook/react-vite";
import { DashboardList } from "./DashboardList";

const meta = {
  title: "Components/DashboardList",
  component: DashboardList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    points: 2000,
    activeMenu: "내 작품 관리",
  },
};

export const NoActiveMenu: Story = {
  args: {
    points: 5000,
  },
};

export const LargePoints: Story = {
  args: {
    points: 100000,
    activeMenu: "포인트",
  },
};
