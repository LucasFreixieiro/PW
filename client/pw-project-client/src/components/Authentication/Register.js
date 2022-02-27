import { useState } from "react";
import "./css/Auth.css";
import { Background } from "./js/Background";

export default function Register() {
  const [email, set_email] = useState("");
  const [nickname, set_nickname] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const register = () => {
    if (email && nickname && password && confirm_password)
      console.log(email, nickname, password, confirm_password);
  };

  const fileHandler = (event) => {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    setImageSrc(reader.result);
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
            placeholder="Email address"
          />
          <label className="_form_label" htmlFor="">
            Username
          </label>
          <input
            value={nickname}
            onChange={(e) => set_nickname(e.target.value)}
            className="_form_input"
            type="text"
            placeholder="Nickname"
          />
          <label className="_form_label" htmlFor="">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => set_password(e.target.value)}
            className="_form_input"
            type="password"
            placeholder="Password"
          />
          <label className="_form_label" htmlFor="">
            Confirm password
          </label>
          <input
            value={confirm_password}
            onChange={(e) => set_confirm_password(e.target.value)}
            className="_form_input"
            type="password"
            placeholder="Confirm password"
          />
          <label>Drag and drop profile image</label>
          <input
            type="file"
            className="_form_image_submit"
            onChange={fileHandler}
          />
          <img src={imageSrc} />
          <button onClick={register()} className="_form_submit">
            Submit
          </button>
        </section>
      </div>
    </div>
  );
}
