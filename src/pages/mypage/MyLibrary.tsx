import { MyLibraryView } from "./MyLibraryView";
import { useMyLibrary } from "@/logic/useMyLibrary";

const MyLibrary = () => {
  const { activeTab, seriesList, points, onTabChange } = useMyLibrary();

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
