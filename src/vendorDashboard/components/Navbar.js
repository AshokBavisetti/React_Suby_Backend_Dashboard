import React from "react";

export default function Navbar({
  showLoginHandler,
  showRegisterHandler,
  showLogOut,
  logOutHandler,
}) {
  const firmName = localStorage.getItem("firmName");

  return (
    <div className="navSection">
      <div className="company">Vendor Dashboard</div>
      <h4 className="firmName">FirmName: {firmName}</h4>
      <div className="useAuth">
        {!showLogOut ? (
          <>
            <span onClick={showLoginHandler}> Login /</span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={logOutHandler}>Logout</span>
        )}
      </div>
    </div>
  );
}
