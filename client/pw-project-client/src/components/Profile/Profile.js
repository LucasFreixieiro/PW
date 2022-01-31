import { useContext } from "react";
import "./css/Profile.css";
import ProfileGameList from "./ProfileGameList";
import ProfilePostList from "./ProfilePostList";
import ProfileSummary from "./ProfileSummary";

function Profile() {
  let user = {};
  return (
    <div className="profile_page">
      <ProfileSummary props={user} />
      <ProfileGameList props={user} />
      <ProfilePostList props={user} />
    </div>
  );
}

export default Profile;
