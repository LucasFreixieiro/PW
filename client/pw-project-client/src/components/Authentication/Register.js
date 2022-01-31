import { useState } from "react";
import "./css/Auth.css";
import { Background } from "./js/Background";

export default function Register() {
  const [email, set_email] = useState("");
  const [nickname, set_nickname] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");

  const register = () => {
    if (email && nickname && password && confirm_password)
      console.log(email, nickname, password, confirm_password);
  };
  return (
    <div id="bg_div">
      <Background />
      <div className="_form_background">
        <section className="_form">
          <h2 className="header_text">Sign up</h2>
          <label className="_form_label" htmlFor="">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => set_email(e.target.value)}
            className="_form_input"
            type="text"
          />
          <label className="_form_label" htmlFor="">
            Username
          </label>
          <input
            value={nickname}
            onChange={(e) => set_nickname(e.target.value)}
            className="_form_input"
            type="text"
          />
          <label className="_form_label" htmlFor="">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => set_password(e.target.value)}
            className="_form_input"
            type="password"
          />
          <label className="_form_label" htmlFor="">
            Confirm password
          </label>
          <input
            value={confirm_password}
            onChange={(e) => set_confirm_password(e.target.value)}
            className="_form_input"
            type="password"
          />
          <button onClick={register()} className="_form_submit">
            Submit
          </button>
        </section>
      </div>
    </div>
  );
}
