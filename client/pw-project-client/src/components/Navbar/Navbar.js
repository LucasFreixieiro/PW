import sun from "./img/sun.png";
import moon from "./img/moon.png";
import dark_logo from "./img/dark_mode_logo.png";
import light_logo from "./img/light_mode_logo.png";
import logout from "./img/logout.png";
import "./css/Navbar.css";
import Avatar from "./Avatar";
import { Link, Navigate } from "react-router-dom";
import { useUserValue } from "../UserState/UserProvider";
import React, { useState, useEffect, createContext } from "react";

function Navbar(props) {
  let color_theme = localStorage.getItem("theme-color");
  const [{ user }, dispatch] = useUserValue();

  const [perm, setPerm] = useState(0);

  const log_user_out = (e) => {
    console.log("loggedout");
    dispatch({ type: "logout" });
  };

  //   function hasPermissions(controller) {
  //     fetch("http://localhost:5000/user/hasPermission/" + controller, {
  //       method: "get",
  //       credentials: "include",
  //     }).then((response) => {
  //       console.log(response);
  //       if (response.status == 200) {
  //         setPerm(1);
  //       } else {
  //         setPerm(0);
  //       }
  //     });
  //   }

  useEffect(() => {
    if (user !== null) setPerm(user.role_id);
  }, [user]);

  return (
    <div className="navbar">
      <Link to="/">
        <div>
          <img
            className="navbar_logo"
            src={
              !color_theme
                ? light_logo
                : color_theme === "theme-light"
                ? light_logo
                : dark_logo
            }
            alt=""
          />
        </div>
      </Link>

      {perm == 1 ? (
        <>
          <Link className="avatar_links" to="/game_management">
            Game Management
          </Link>
          <Link className="avatar_links" to="/user_management">
            User Management
          </Link>
        </>
      ) : null}
      <div className="navbar_sub_items">
        <Avatar />
        {user ? (
          <div
            onClick={(e) => {
              log_user_out(e);
            }}
          >
            <img className="" src={logout} alt="" />
          </div>
        ) : null}
        <div
          onClick={() => {
            color_theme = localStorage.getItem("theme-color");
            color_theme === "theme-light"
              ? props.handler("theme-dark")
              : props.handler("theme-light");
          }}
        >
          <img
            className="dark_mode_toggle"
            src={
              !color_theme ? moon : color_theme === "theme-light" ? moon : sun
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
