import { PointHistoryView } from "./PointHistoryView";
import { usePointHistory } from "@/logic/usePointHistory";
import { createUserPort } from "@/services/user.service";
import { createPointPort } from "@/services/point.service";

const PointHistory = () => {
  const user = createUserPort();
  const point = createPointPort();
  const {
    activeTab,
    points,
    chargeHistory,
    usageHistory,
    onTabChange,
  } = usePointHistory({ user, point });

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
