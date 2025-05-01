import LatestUser from "@/components/(adminDashboard)/dashboard/LatestUser";
import Statistic from "@/components/(adminDashboard)/dashboard/Statistic";
import UserOverviewChart from "@/components/(adminDashboard)/dashboard/UserOverviewChart";
import { getDashboardStatistics } from "@/services/statistics";

const DashboardPage = async () => {

  const StatisticData = await getDashboardStatistics();

  console.log("StatisticData", StatisticData );

  return (
    <div className="lg:space-y-10 space-y-5 ">
      <Statistic></Statistic>
      <UserOverviewChart></UserOverviewChart>
      <LatestUser></LatestUser>
    </div>
  );
};

export default DashboardPage;
