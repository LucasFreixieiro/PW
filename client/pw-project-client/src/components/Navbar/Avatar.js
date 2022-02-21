import "./css/Avatar.css";
import { Link } from "react-router-dom";
import { useUserValue } from "../UserState/UserProvider";

function Avatar() {
  const [{ user }, dispatch] = useUserValue();
  return (
    <div>
      {user ? (
        user.nickname ? (
          <div className="avatar_div">
            <Link className="avatar_links" to={`/profile/${user.id}`}>
              {user.nickname}
            </Link>
            <img
              className="avatar_img"
              src={`http://localhost:5000/static/pfp/${user.avatar}`}
              alt=""
            />
          </div>
        ) : (
          ""
        )
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
