import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <div className="errorSection">
        <Link to="/">
          <p>Go Back</p>
        </Link>

        <h1>404</h1>
        <div className="errorText">Page Not found</div>
      </div>
    </>
  );
}
