import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserValue } from "../UserState/UserProvider";
import "./css/Profile.css";
import ProfileGameList from "./ProfileGameList";
import ProfilePostList from "./ProfilePostList";
import ProfileSummary from "./ProfileSummary";
import { Link } from "react-router-dom";

function Profile() {
  const [{ user }, dispatch] = useUserValue();
  const [profile_user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const user_id = useParams().id;

  function check_error(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      if (response.status == 403) {
        dispatch({ type: "logout" });
      }
      throw Error(response.status);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:5000/profile/${user_id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setUser(result);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  }, [user_id]);

  if (error) {
    if (error.message === "403") {
      return (
        <div className="information_div">
          <p className="information">
            Insuficient permissions. Are you logged in?
          </p>
          <Link className="information_return" to="/login">
            Return to login
          </Link>
        </div>
      );
    } else {
      return (
        <div className="information_div">
          <p className="information">Error fetching profile</p>
          <Link className="information_return" to="/">
            Return to home
          </Link>
        </div>
      );
    }
  } else if (!isLoaded) {
    return <div className="information">Loading profile info..</div>;
  } else {
    return (
      <div className="profile_page">
        {profile_user ? (
          <div>
            <ProfileSummary user={profile_user} />
            <ProfileGameList games={profile_user.games} />
            <ProfilePostList posts={profile_user.posts} />
          </div>
        ) : (
          "Failed to get user info"
        )}
      </div>
    );
  }
}
export default Profile;
