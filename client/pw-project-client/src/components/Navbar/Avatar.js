import "./css/Avatar.css";
import { Link } from "react-router-dom";
import { useUserValue } from "../UserState/UserProvider";
import { Navigate } from "react-router-dom";
function Avatar() {
  const [{ user }, dispatch] = useUserValue();

  const logout = (e) => {
    console.log("loggedout");
    dispatch({ type: "logout" });
  };

  return (
    <div>
      {user ? (
        user.nickname ? (
          <div className="avatar_div">
            <div
              className="avatar_links"
              onClick={(e) => {
                return <Navigate replace="true" to={`/login`} />;
              }}
            >
              {user.nickname}
            </div>
            <div>
              <img
                className="avatar_img"
                src={`http://localhost:5000/static/pfp/${user.avatar}`}
                alt=""
              />
            </div>
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
