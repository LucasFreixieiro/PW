import React, { useEffect, useState } from "react";
import "./css/Toast.css";
import check from "./img/check.svg";
import error from "./img/error.svg";
import info from "./img/info.svg";
import warning from "./img/warning.svg";

function Toast({ position, timeout, type, description, title }) {
  let icon;
  let backgroundColor;
  const [fade, setFade] = useState("");

  useEffect(() => {
    const fadeout = setTimeout(() => {
      setFade("fadeout");
    }, timeout);
    return () => {
      clearTimeout(fadeout);
    };
  }, []);

  switch (type) {
    case "success":
      icon = check;
      title = "Success";
      backgroundColor = "#5cb85c";
      break;
    case "warning":
      icon = warning;
      title = "Warning";
      backgroundColor = "#f0ad4e";
      break;
    case "information":
      icon = info;
      title = "Information";
      backgroundColor = "#5bc0de";
      break;
    case "error":
      icon = error;
      title = "Error";
      backgroundColor = "#d9534f";
      break;
  }

  return (
    <>
      <div
        style={{ backgroundColor: backgroundColor }}
        className={`notification toast ${position} ${fade}`}
      >
        <button>X</button>
        <div className="notification-image">
          <img src={icon} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="notification-title">{title}</p>
          <p className="notification-message">{description}</p>
        </div>
      </div>
    </>
  );
}

export default Toast;
