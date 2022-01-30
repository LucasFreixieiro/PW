import './css/Profile.css'

export default function ProfileSummary({ props }) {
    return (
        <div className="player_summary">
            <img className="player_avatar" src={props.image_url} alt="profile_img" />
            <div className="player_stats">
                <span className="player_name">{props.player_name}</span>
                <span>{props.games.length} games</span>
                <span>{props.posts.length} posts</span>
            </div>
        </div>
    )
}