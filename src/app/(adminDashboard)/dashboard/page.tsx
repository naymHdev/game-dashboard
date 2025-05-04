import LatestUser from "@/components/(adminDashboard)/dashboard/LatestUser";
import Statistic from "@/components/(adminDashboard)/dashboard/Statistic";
import UserOverviewChart from "@/components/(adminDashboard)/dashboard/UserOverviewChart";
import { dashBoardStatics } from "@/services/statistics";

const DashboardPage = async () => {
  const StatisticData = await dashBoardStatics();
  // console.log("StatisticData", StatisticData.data);

  return (
    <div className="lg:space-y-10 space-y-5 ">
      <Statistic StatisticData={StatisticData.data} />
      <UserOverviewChart userStatistics={StatisticData.data} />
      <LatestUser />
    </div>
  );
};

export default DashboardPage;
