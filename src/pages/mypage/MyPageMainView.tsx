import { FC } from "react";
import { DashboardList } from "@/components/DashboardList/DashboardList";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { AddSeries } from "@/components/AddSeries/AddSeries";
import { RadioButton } from "@/components/RadioButton/RadioButton";

type TabType = "작품" | "포스트";

type Props = {
  points: number;
  profile: {
    name: string;
    bio: string[];
    contact: string;
    profileImageUrl?: string;
  } | null;
  seriesList: Array<{ id: number; imageUrl: string; title: string }>;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onProfileEdit: () => void;
  onLogout: () => void;
};

export const MyPageMainView: FC<Props> = ({
  points,
  profile,
  seriesList,
  activeTab,
  onTabChange,
  onProfileEdit,
  onLogout,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex items-start gap-38 px-80 pt-48">
        {/* Dashboard Sidebar */}
        <div className="shrink-0">
          <DashboardList points={points} />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-10">
          {/* Profile Section */}
          <div className="flex flex-col items-start gap-47">
            <div className="flex items-center gap-38">
              {/* Profile Image */}
              <div className="bg-grayscale-g2 relative flex size-120 shrink-0 items-center justify-center rounded-full">
                <span className="text-grayscale-g5">프로필</span>
              </div>
              <div className="flex w-233 flex-col items-start gap-9 text-black">
                <p className="text-headings-heading-4 w-full tracking-tight text-black">
                  {profile?.name || "[작가명]"}
                </p>
                <div className="text-body-regular w-full tracking-tight text-black">
                  {profile?.bio.map((line, idx) => (
                    <p key={idx} className={idx === 0 ? "mb-0" : ""}>
                      {line}
                    </p>
                  )) || (
                    <>
                      <p className="mb-0">안녕하세요 누구입니다 안녕</p>
                      <p>나 누구 좋아한다..</p>
                    </>
                  )}
                </div>
                <p className="text-body-small-regular text-subtle w-full tracking-tight">
                  {profile?.contact || "작가 개인 sns, 이메일"}
                </p>
              </div>
            </div>
            <div className="border-grayscale-g2 h-0 w-full border-t" />
          </div>

          {/* Tab Buttons */}
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
          <div className="px-md flex flex-wrap items-center gap-12 py-0">
            {seriesList.map((series) => (
              <SeriesCardSmall
                key={series.id}
                imageUrl={series.imageUrl}
                title={series.title}
              />
            ))}
            <AddSeries />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-10 px-80 pt-13">
        <button
          onClick={onProfileEdit}
          className="bg-background-subtle flex h-38 items-center gap-10 rounded-sm px-26 py-9"
        >
          <span className="text-body-medium text-[#7b7978]">프로필 수정</span>
        </button>
        <button
          onClick={onLogout}
          className="bg-background-subtle flex h-38 items-center gap-10 rounded-sm px-26 py-9"
        >
          <span className="text-body-medium text-[#7b7978]">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

