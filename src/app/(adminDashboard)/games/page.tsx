import AllGamesTable from "@/components/(adminDashboard)/Games";
import { getAllGames } from "@/services/games";

const AllGamesPage = async () => {
  const gamesArray = await getAllGames();

  return (
    <>
      <div>
        <AllGamesTable gamesArray={gamesArray} />
      </div>
    </>
  );
};

export default AllGamesPage;
