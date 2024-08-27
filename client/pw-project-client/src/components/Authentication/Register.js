import { useState } from "react";
import "./css/Auth.css";
import { Background } from "./js/Background";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [imageSrc, setImageSrc] = useState("");
  const [redirect, setRedirect] = useState(false);

  const register = (e) => {
    e.preventDefault();
    let form = document.getElementById("registerForm");

    let email = form["email"].value;
    let nickname = form["nickname"].value;
    let password = form["password"].value;
    let avatar = form["pfp"].files[0];

    fetch("http://localhost:5000/user/register", {
      method: "POST",
      body: new URLSearchParams({
        email: email,
        password: password,
        nickname: nickname,
        avatar: avatar,
      }),
    })
      .then((res) => res.text())
      .then((result) => setRedirect(true))
      .catch((error) => alert(error));
  };

  if (redirect) {
    return <Navigate replace="true" to={`/login`} />;
  }

  const fileHandler = (event) => {
    setImageSrc(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div id="bg_div">
      <Background />
      <form
        onSubmit={(e) => register(e)}
        id="registerForm"
        className="_form_background"
      >
        <section className="_form">
          <h2 className="header_text">Sign up</h2>
          <label className="_form_label" htmlFor="">
            Email address
          </label>
          <input
            name="email"
            className="_form_input"
            type="text"
            placeholder="Email address"
            required
          />
          <label className="_form_label" htmlFor="">
            Username
          </label>
          <input
            name="nickname"
            className="_form_input"
            type="text"
            placeholder="Nickname"
            required
          />
          <label className="_form_label" htmlFor="">
            Password
          </label>
          <input
            name="password"
            className="_form_input"
            type="password"
            placeholder="Password"
            required
          />
          <label className="_form_label" htmlFor="">
            Confirm password
          </label>
          <input
            name="confirm"
            className="_form_input"
            type="password"
            placeholder="Confirm password"
            required
          />
          <label>Drag and drop profile image</label>
          <input
            name="pfp"
            type="file"
            className="_form_image_submit"
            onChange={fileHandler}
          />
          <img className="register_img" src={imageSrc} />
          <label style={{ textAlign: "center", margin: "10px 0px" }} htmlFor="">
            Profile picture
          </label>
          <button type="submit" className="_form_submit">
            Submit
          </button>
          <label
            style={{ textAlign: "center" }}
            className="_form_label"
            htmlFor=""
          >
            Already registered?
          </label>
          <Link
            style={{ textAlign: "center", margin: "10px 0px" }}
            className="redirect"
            to="/login"
          >
            Login
          </Link>
        </section>
      </form>
    </div>
  );
}
