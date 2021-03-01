import React from "react";
import "./notification.css";

const Notification = ({ notification }) => {
  const { message, status } = notification;
  if (message === "") {
    return null;
  }

  // Demonstrating both inline styles and className styles
  const style = {
    display: "block",
    fontSize: "1.5rem",
    boxSizing: "border-box",
    padding: "0 1rem",
  };
  return (
    <div style={style} className={status}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
