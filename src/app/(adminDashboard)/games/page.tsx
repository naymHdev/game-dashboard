import AllGamesTable from "@/components/(adminDashboard)/Games";
import GameTable from "@/components/(adminDashboard)/Games/GameTable";
import { getAllGames } from "@/services/games";

const AllGamesPage = async ({ searchParams }) => {
  const page = searchParams.page || 1;
  const gamesArray = await getAllGames(page);

  return (
    <>
      <div>
        {/* <AllGamesTable gamesArray={gamesArray} /> */}
        <GameTable gamesArray={gamesArray} searchParams={page} />
      </div>
    </>
  );
};

export default AllGamesPage;
