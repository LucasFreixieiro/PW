import { useContext } from "react";
import "./css/Profile.css";

export default function ProfileSummary() {
  let summary = {};
  return (
    <div className="player_summary">
      <img
        className="player_avatar"
        src={summary.avatar_url}
        alt="profile_img"
      />
      <div className="player_stats">
        <span className="player_name">{summary.nickname}</span>
        <span>{summary.games.length} games</span>
        <span>{summary.posts.length} posts</span>
      </div>
    </div>
  );
}
