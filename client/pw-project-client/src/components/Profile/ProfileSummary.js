import { useContext } from "react";
import "./css/Profile.css";

export default function ProfileSummary(props) {
  let user = props.user;
  return (
    <div className="player_summary">
      {user ? (
        <div>
          <img
            className="player_avatar"
            src={`http://localhost:5000/static/pfp/${user.avatar}`}
            alt="profile_img"
            target="_blank"
          />
          <div className="player_stats">
            <span className="player_name">{user.nickname}</span>
            <span>{user.games.length} games</span>
            <span>{user.posts.length} posts</span>
          </div>
        </div>
      ) : (
        "Failed to get thingy"
      )}
    </div>
  );
}
