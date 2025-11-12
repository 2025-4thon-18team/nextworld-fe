import { FC } from "react";
import { DashboardList } from "@/components/DashboardList/DashboardList";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { SoldContentItem } from "@/components/SoldContentItem/SoldContentItem";
import Button from "@/components/Button/Button";

type RevenueTab = "대시보드" | "판매내역";

type Props = {
  points: number;
  activeTab: RevenueTab;
  revenueData: {
    totalSales: string;
    totalRevenue: string;
    authorFee: string;
    platformFee: string;
    finalRevenue: string;
  } | null;
  salesHistory: Array<{
    id: number;
    contentTitle: string;
    buyer: string;
    points: number;
    date: string;
  }>;
  onTabChange: (tab: RevenueTab) => void;
};

export const RevenueView: FC<Props> = ({
  points,
  activeTab,
  revenueData,
  salesHistory,
  onTabChange,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex items-start gap-38 px-80 pt-48">
        {/* Dashboard Sidebar */}
        <div className="shrink-0">
          <DashboardList points={points} />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-25">
          <p className="text-headings-heading-2 tracking-tight text-black">
            수익 현황
          </p>

          {/* Tab Buttons */}
          <div className="flex items-center gap-2">
            <RadioButton
              selected={activeTab === "대시보드"}
              onClick={() => onTabChange("대시보드")}
            >
              대시보드
            </RadioButton>
            <RadioButton
              selected={activeTab === "판매내역"}
              onClick={() => onTabChange("판매내역")}
            >
              판매내역
            </RadioButton>
          </div>

          {/* Dashboard Content */}
          {activeTab === "대시보드" && revenueData && (
            <div className="flex flex-col items-start gap-25">
              <div className="border-grayscale-g2 h-0 w-full border-t" />

              <div className="gap-lg px-md flex w-full flex-col items-start py-0">
                <div className="text-body-medium flex w-full items-center justify-between tracking-tight text-gray-500">
                  <p className="w-157">판매 작품수</p>
                  <p className="w-94 text-right">{revenueData.totalSales}</p>
                </div>
                <div className="text-body-medium flex w-full items-center justify-between tracking-tight text-gray-500">
                  <p className="w-166">총 수익 금액</p>
                  <p className="w-163 text-right">
                    <span className="text-14">₩</span>
                    <span className="text-16">{revenueData.totalRevenue.replace("₩ ", "")}</span>
                  </p>
                </div>
                <div className="text-body-medium flex w-full items-center justify-between tracking-tight text-gray-500">
                  <p className="w-187">원작자 수수료</p>
                  <p className="w-148 text-right">
                    <span className="text-14">₩</span>
                    <span className="text-16">{revenueData.authorFee.replace("₩ ", "")}</span>
                  </p>
                </div>
                <div className="text-body-medium flex w-full items-center justify-between tracking-tight text-gray-500">
                  <p className="w-187">플랫폼 수수료</p>
                  <p className="w-144 text-right">
                    <span className="text-14">₩</span>
                    <span className="text-16">{revenueData.platformFee.replace("₩ ", "")}</span>
                  </p>
                </div>
              </div>

              <div className="border-grayscale-g2 h-0 w-full border-t" />

              <div className="px-md text-headings-heading-4 flex w-full items-center justify-between py-0 tracking-tight text-[#642c8d]">
                <p className="w-181">총 수익 금액</p>
                <p className="w-170 text-right">
                  <span className="text-16">₩</span>
                  <span className="text-18">{revenueData.finalRevenue.replace("₩ ", "")}</span>
                </p>
              </div>

              {/* Settlement Button */}
              <div className="flex w-full justify-center pt-25">
                <Button variant="default" className="w-368">
                  정산하기
                </Button>
              </div>
            </div>
          )}

          {/* Sales History Content */}
          {activeTab === "판매내역" && (
            <div className="gap-xs flex flex-col items-start">
              {salesHistory.map((item) => (
                <SoldContentItem
                  key={item.id}
                  contentTitle={item.contentTitle}
                  buyer={item.buyer}
                  points={item.points}
                  date={item.date}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

