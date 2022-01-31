import GamePost from './GamePost'

export default function ProfileGameList({ props }) {
    return (
        <div className="profile_games_list">
            <div className="title_card">Games</div>
            {props.games.length > 0 ?
                props.games.map((game) =>
                    <GamePost props={game} key={game.title} />
                ) :
                <div>
                    This user has registered no games.
                </div>
            }
        </div>
    )
}