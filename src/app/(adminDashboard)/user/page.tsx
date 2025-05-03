import UsersTable from "@/components/(adminDashboard)/user/UsersTable";
import { allUser } from "@/services/auth";

const UserPage = async () => {
  const { data: usersData } = await allUser();
  // console.log("usersData", usersData);

  return (
    <div>
      <UsersTable usersData={usersData} />
    </div>
  );
};

export default UserPage;
