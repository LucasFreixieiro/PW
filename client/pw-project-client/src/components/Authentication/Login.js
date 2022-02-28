import { useContext, useState } from "react";
import { useUserValue } from "../UserState/UserProvider";
import "./css/Auth.css";
import { Background } from "./js/Background";
import { Navigate, Link } from "react-router-dom";

export default function Login() {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user }, dispatch] = useUserValue();
  let user_info;

  function login_handler() {
    if (email && password) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/user/login", true);
      xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(`email=${email}&password=${password}`);
      xhr.onload = function (e) {
        if (xhr.status === 200) {
          user_info = JSON.parse(xhr.responseText);
          user_info = user_info.user;
          dispatch({
            type: "login",
            user: user_info,
          });
          setRedirect(true);
        } else {
          console.log(xhr.statusText);
        }
      };
    } else {
      alert("One or more fields are empty");
    }
  }

  if (redirect) {
    return <Navigate replace="true" to={`/profile/${user.id}`} />;
  }

  return (
    <div id="bg_div">
      <Background />
      <div className="_form_background">
        <section className="_form">
          <h2 className="header_text">Login in</h2>
          <label className="_form_label" htmlFor="">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="_form_input"
            type="text"
            placeholder="Email address"
          />
          <label className="_form_label" htmlFor="">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="_form_input"
            type="password"
            placeholder="Password"
          />
          <button onClick={login_handler} className="_form_submit">
            Submit
          </button>
          <label
            style={{ textAlign: "center", margin: "10px 0px" }}
            htmlFor="_form_label"
          >
            Not yet registered?
          </label>
          <Link
            style={{ textAlign: "center" }}
            className="redirect"
            to={"/register"}
          >
            Sign Up
          </Link>
        </section>
      </div>
    </div>
  );
}
