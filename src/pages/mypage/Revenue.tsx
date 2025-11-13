import { RevenueView } from "./RevenueView";
import { useRevenue } from "@/logic/useRevenue";

const Revenue = () => {
  const {
    activeTab,
    points,
    revenueData,
    salesHistory,
    onTabChange,
  } = useRevenue();

  return (
    <RevenueView
      points={points}
      activeTab={activeTab}
      revenueData={revenueData}
      salesHistory={salesHistory}
      onTabChange={onTabChange}
                />
  );
};

export default Revenue;
