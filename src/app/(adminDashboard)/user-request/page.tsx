import UserRequestContainer from "@/components/(adminDashboard)/user-request/UserRequestContainer";
import { getAllUserRequests } from "@/services/users";

const UserRequestPage = async () => {
  const userData = await getAllUserRequests();
  // console.log("UserRequestPage", userData);

  return (
    <div>
      <UserRequestContainer userData={userData} />
    </div>
  );
};

export default UserRequestPage;
