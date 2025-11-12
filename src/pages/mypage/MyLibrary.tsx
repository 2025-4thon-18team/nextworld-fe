import { MyLibraryView } from "./MyLibraryView";
import { useMyLibrary } from "@/logic/useMyLibrary";
import { createUserPort } from "@/services/user.service";
import { createSeriesPort } from "@/services/series.service";

const MyLibrary = () => {
  const user = createUserPort();
  const series = createSeriesPort();
  const { activeTab, seriesList, points, onTabChange } = useMyLibrary({
    user,
    series,
  });

  return (
    <MyLibraryView
      points={points}
      seriesList={seriesList}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
};

export default MyLibrary;
