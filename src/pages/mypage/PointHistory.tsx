import { PointHistoryView } from "./PointHistoryView";
import { usePointHistory } from "@/logic/usePointHistory";

const PointHistory = () => {
  const {
    activeTab,
    points,
    chargeHistory,
    usageHistory,
    onTabChange,
  } = usePointHistory();

  return (
    <PointHistoryView
      points={points}
      activeTab={activeTab}
      chargeHistory={chargeHistory}
      usageHistory={usageHistory}
      onTabChange={onTabChange}
    />
  );
};

export default PointHistory;
