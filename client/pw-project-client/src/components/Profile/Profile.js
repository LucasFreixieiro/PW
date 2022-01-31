import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useUserValue } from "../UserState/UserProvider";
import "./css/Profile.css";
import ProfileGameList from "./ProfileGameList";
import ProfilePostList from "./ProfilePostList";
import ProfileSummary from "./ProfileSummary";

function Profile() {
  let user = useParams().id;
  let profile_info = {};

  if (user) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", `http://localhost:5000/profile/${user}`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onload = function (e) {
      if (xhr.status === 200) {
        profile_info = JSON.parse(xhr.responseText);
        console.log(profile_info);
      }
    };
  }

  console.log(user);
  return (
    <div className="profile_page">
      {user ? (
        <div>
          {/* <ProfileSummary props={user} />
          <ProfileGameList props={user} />
          <ProfilePostList props={user} /> */}
        </div>
      ) : (
        "Failed to get user info"
      )}
    </div>
  );
}
export default Profile;
