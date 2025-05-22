import GameEditTable from "@/components/(adminDashboard)/GameEditRequest/GameEditTable";
import { getGameEditRequest } from "@/services/games";

const GameEditRequest = async () => {
  const { data: gameEditData } = await getGameEditRequest();
  // console.log("gameEditData", gameEditData);

  return (
    <>
      <div>
        <GameEditTable gameEditData={gameEditData} />
      </div>
    </>
  );
};

export default GameEditRequest;
