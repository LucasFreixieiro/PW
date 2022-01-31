import { useContext, useState } from "react";
import { useUserValue } from "../UserState/UserProvider";
import "./css/Auth.css";
import { Background } from "./js/Background";

const user3 = {
  player_id: 1,
  nickname: "Dummy",
  avatar_url:
    "https://avatars.dicebear.com/api/adventurer-neutral/your-cusseeedadadwadawdadadwadAtom-seed.svg",
  posts: [
    {
      id: 1,
      title: "Thread Title",
      comment_amount: 20,
      post_date: 20,
      post_img_url:
        "https://via.placeholder.com/1920x1080.png?text=Placeholder",
      post_url: "/profile/", //change this to the game page link later
    },
    {
      id: 2,
      title: "Another Thread Title",
      comment_amount: 30,
      post_date: 20,
      post_img_url:
        "https://via.placeholder.com/1920x1080.png?text=Placeholder",
      post_url: "/profile/", //change this to the game page link later
    },
  ],
  games: [
    {
      title: "Game 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis",
      image_url: "https://via.placeholder.com/1920x1080.png?text=Placeholder",
      game_url: "/profile/", //change this to the game page link later
    },
    {
      title: "Game 2",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem perspiciatis dolor quod, saepe quas autem esse illo laboriosam obcaecati quasi ipsa inventore nam? Consequuntur veritatis nostrum, facere dolore modi pariatur.",
      image_url: "https://via.placeholder.com/1920x1080.png?text=Placeholder",
      game_url: "/profile/", //change this to the game page link later
    },
  ],
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [{ user }, dispatch] = useUserValue();
  let user_info;
  const login_handler = () => {
    if (email && password) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/user/login", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(`email=${email}&password=${password}`);
      xhr.onload = function (e) {
        if (xhr.status === 200) {
          user_info = JSON.parse(xhr.responseText);
          user_info = user_info.user;
          console.log(user_info);
          dispatch({
            type: "login",
            user: user_info,
          });
        } else {
          console.log(xhr.statusText);
        }
      };
    } else {
      alert("One or more fields are empty");
    }
  };

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
          />
          <label className="_form_label" htmlFor="">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="_form_input"
            type="password"
          />
          <button onClick={login_handler} className="_form_submit">
            Submit
          </button>
        </section>
      </div>
    </div>
  );
}
