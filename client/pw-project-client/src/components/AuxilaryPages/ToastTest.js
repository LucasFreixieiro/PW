import React from "react";
import { ToastContainer } from "./ToastContainer";
import { useState, useEffect } from "react";
import {
  notification,
  addNotification,
  removeNotification,
} from "./notifications";
import "./css/Toast.css";

function ToastTest() {
  const [n, sn] = useState(notification);
  return (
    <div className="toast-test-page">
      <ToastContainer />
      <button
        onClick={() => {
          addNotification("success", "Sucessefully Logged in");
          sn(notification);
        }}
      >
        Success notification
      </button>
      <button
        onClick={() => {
          addNotification("warning", "Dont do that");
          sn(notification);
        }}
      >
        Warning notification
      </button>
      <button
        onClick={() => {
          addNotification("information", "Useful Information");
          sn(notification);
        }}
      >
        Information notification
      </button>
      <button
        onClick={() => {
          addNotification("error", "Oops we encontered an error");
          sn(notification);
        }}
      >
        Error notification
      </button>
    </div>
  );
}

export default ToastTest;
