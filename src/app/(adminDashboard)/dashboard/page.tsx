import LatestUser from "@/components/(adminDashboard)/dashboard/LatestUser";
import Statistic from "@/components/(adminDashboard)/dashboard/Statistic";
import UserOverviewChart from "@/components/(adminDashboard)/dashboard/UserOverviewChart";

const DashboardPage = async () => {
  console.log("allGamesData", );
  console.log("allGamesData");

  return (
    <div className="lg:space-y-10 space-y-5 ">
      <Statistic></Statistic>
      <UserOverviewChart></UserOverviewChart>
      <LatestUser></LatestUser>
    </div>
  );
};

export default DashboardPage;
