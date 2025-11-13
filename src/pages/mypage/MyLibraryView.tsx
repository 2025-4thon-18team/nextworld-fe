import { FC } from "react";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { RadioButton } from "@/components/RadioButton/RadioButton";

type TabType = "구매한 작품" | "구매한 포스트";

type Props = {
  seriesList: Array<{ id: number; imageUrl: string; title: string }>;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const MyLibraryView: FC<Props> = ({
  seriesList,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex flex-col gap-24">
      <p className="text-headings-heading-2 w-full tracking-tight text-black">
        내 서재
      </p>

      <div className="gap-lg flex flex-col items-center">
        {/* Tab Buttons */}
        <div className="flex w-full items-center gap-2">
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
        <div className="gap-lg px-md flex w-full flex-wrap items-center py-0">
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
  );
};
