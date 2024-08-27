import React, { useEffect, useState } from "react";
import Toast from "./Toast";
import "./css/Toast.css";
import {
  notification as notification_list,
  addNotification,
  removeNotification,
} from "./notifications";

function ToastContainer({ position, timeout }) {
  if (!position) position = "bottom-left";
  if (!notification_list) notification_list = [];
  if (!timeout) timeout = 2000;
  const [n, sn] = useState(notification_list);

  useEffect(() => {
    const interval = setInterval(() => {
      removeNotification(notification_list.length - 1);
      sn(notification_list);
    }, timeout + 1000);
    return () => clearInterval(interval);
  }, [notification_list]);

  return (
    <div className={`notification-container ${position}`}>
      {notification_list.map((toast, i) => (
        <Toast
          timeout={timeout}
          key={i}
          type={toast.type}
          description={toast.description}
        />
      ))}
    </div>
  );
}

export { ToastContainer };
