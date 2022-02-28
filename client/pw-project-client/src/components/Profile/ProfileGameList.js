import GamePost from "./GamePost";

export default function ProfileGameList({ games }) {
  return (
    <div className="profile_games_list">
      <div className="title_card">Games</div>
      {games !== null && games.length > 0 ? (
        games.map((game) => <GamePost props={game} key={game.title} />)
      ) : (
        <div>This user has registered no games.</div>
      )}
    </div>
  );
}
