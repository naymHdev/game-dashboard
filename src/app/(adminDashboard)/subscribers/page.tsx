import SubscribersTable from "@/components/(adminDashboard)/Subscribers/SubscribersTable";
import { getSubscribers } from "@/services/subscribers";

const SubscribersPage = async () => {
  const { data: subscribersData } = await getSubscribers();
  // console.log("subscribersData", subscribersData?.emails);

  return (
    <>
      <div>
        <SubscribersTable user={subscribersData?.emails} />
      </div>
    </>
  );
};

export default SubscribersPage;
