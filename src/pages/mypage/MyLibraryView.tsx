import { FC } from "react";
import { DashboardList } from "@/components/DashboardList/DashboardList";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { RadioButton } from "@/components/RadioButton/RadioButton";

type TabType = "구매한 작품" | "구매한 포스트";

type Props = {
  points: number;
  seriesList: Array<{ id: number; imageUrl: string; title: string }>;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const MyLibraryView: FC<Props> = ({
  points,
  seriesList,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="bg-white relative w-full min-h-screen">
      <div className="flex gap-38 items-start pt-48 px-80">
        {/* Dashboard Sidebar */}
        <div className="shrink-0">
          <DashboardList points={points} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-24">
          <p className="text-headings-heading-2 text-black tracking-tight w-full">
            내 서재
          </p>

          <div className="flex flex-col gap-lg items-center">
            {/* Tab Buttons */}
            <div className="flex gap-2 items-center w-full">
              <RadioButton
                selected={activeTab === "구매한 작품"}
                onClick={() => onTabChange("구매한 작품")}
              >
                구매한 작품
              </RadioButton>
              <RadioButton
                selected={activeTab === "구매한 포스트"}
                onClick={() => onTabChange("구매한 포스트")}
              >
                구매한 포스트
              </RadioButton>
            </div>

            {/* Series Grid */}
            <div className="flex flex-wrap gap-lg items-center px-md py-0 w-full">
              {seriesList.map((series) => (
                <SeriesCardSmall
                  key={series.id}
                  imageUrl={series.imageUrl}
                  title={series.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

