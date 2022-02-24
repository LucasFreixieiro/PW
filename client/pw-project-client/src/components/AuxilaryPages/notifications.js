let notification = [];

function addNotification(type, description) {
  notification = [...notification, { type, description }];
  return notification;
}

function removeNotification(a) {
  return (notification = [
    ...notification.slice(0, a),
    ...notification.slice(a + 1),
  ]);
}

export { notification, addNotification, removeNotification };
