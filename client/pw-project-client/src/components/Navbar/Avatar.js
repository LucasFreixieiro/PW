import "./css/Avatar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";

function Avatar(props) {
  let user = {};
  return (
    <div>
      {user.nickname ? (
        <div className="avatar_div">
          <Link className="avatar_links" to="/profile/">
            {user.nickname}
          </Link>
          <img className="avatar_img" src={user.avatar_url} alt="" />
        </div>
      ) : (
        <div className="avatar_div">
          <Link className="avatar_links" to="/login/">
            Login
          </Link>
          <Link className="avatar_links" to="/register/">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Avatar;
