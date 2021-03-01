import React from "react";

const LogOutForm = ({ handleLogout }) => {
  return (
    <form onSubmit={handleLogout}>
      <button type="submit">Log out</button>
    </form>
  );
};

export default LogOutForm;
