import { RevenueView } from "./RevenueView";
import { useRevenue } from "@/logic/useRevenue";
import { createUserPort } from "@/services/user.service";
import { createRevenuePort } from "@/services/revenue.service";

const Revenue = () => {
  const user = createUserPort();
  const revenue = createRevenuePort();
  const {
    activeTab,
    points,
    revenueData,
    salesHistory,
    onTabChange,
  } = useRevenue({ user, revenue });

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
