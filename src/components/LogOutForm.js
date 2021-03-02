import React from "react";

const LogOutForm = ({ handleLogout }) => {
  return (
    <form onSubmit={handleLogout}>
      <button type="submit" id="logout-button">
        Log out
      </button>
    </form>
  );
};

export default LogOutForm;
