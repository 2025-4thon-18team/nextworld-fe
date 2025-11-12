import { FC } from "react";
import { cn } from "@/utils";
import { ProfileImg } from "@/components/ProfileImg/ProfileImg";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { SeriesCard } from "@/components/SeriesCard/SeriesCard";

type TabType = "작품" | "포스트";

type Props = {
  authorName: string;
  authorBio: string[];
  authorContact: string;
  profileImageUrl?: string;
  activeTab: TabType;
  seriesList: Array<{
    id: number;
    imageUrl: string;
    title: string;
    tags: string[];
  }>;
  onTabChange: (tab: TabType) => void;
};

export const AuthorPageView: FC<Props> = ({
  authorName,
  authorBio,
  authorContact,
  profileImageUrl,
  activeTab,
  seriesList,
  onTabChange,
}) => {
  return (
    <div className="bg-white relative flex min-h-screen w-full flex-col items-center gap-32">
      {/* Profile Section */}
      <div className="flex w-1062 flex-col items-start gap-10">
        <div className="flex w-full flex-col items-start gap-47">
          <div className="flex items-center gap-38">
            <ProfileImg imageUrl={profileImageUrl} size="lg" />
            <div className="flex w-233 flex-col items-start gap-9 text-black">
              <p className="text-headings-heading-4 w-full tracking-tight text-black">
                {authorName}
              </p>
              <div className="text-body-regular w-full tracking-tight text-black">
                {authorBio.map((line, idx) => (
                  <p key={idx} className={idx === 0 ? "mb-0" : ""}>
                    {line}
                  </p>
                ))}
              </div>
              <p className="text-body-small-regular text-subtle w-full tracking-tight">
                {authorContact}
              </p>
            </div>
          </div>
          <div className="h-0 w-full border-t border-black" />
        </div>

        {/* Tab Buttons */}
        <div className="flex w-full flex-col items-start gap-40">
          <div className="flex items-center gap-2">
            <RadioButton
              selected={activeTab === "작품"}
              onClick={() => onTabChange("작품")}
            >
              작품
            </RadioButton>
            <RadioButton
              selected={activeTab === "포스트"}
              onClick={() => onTabChange("포스트")}
            >
              포스트
            </RadioButton>
          </div>

          {/* Series Grid */}
          <div className="px-md flex flex-wrap items-start gap-12 py-0">
            {seriesList.map((series) => (
              <SeriesCard
                key={series.id}
                imageUrl={series.imageUrl}
                title={series.title}
                tags={series.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

