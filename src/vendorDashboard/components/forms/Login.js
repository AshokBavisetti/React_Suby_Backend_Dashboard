import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

export default function Login({ setShowLogOut, setShowFirm, setShowFirmTitle, setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Login failed");
        return;
      }

      alert("Login successful");
      setShowLogin(false)

      // Save token
      localStorage.setItem("loginToken", data.token);

      const vendorId = data.vendorId;
      const token = data.token;

      const vendorResponse = await fetch(
        `${API_URL}/vendor/single-vendor/${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const vendorData = await vendorResponse.json();

      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendor.firm[0]?._id;
        const vendorFirmName = vendorData.vendor.firm[0]?.firmName;

        if (vendorFirmId && vendorFirmName) {
          localStorage.setItem("firmId", vendorFirmId);
          localStorage.setItem("firmName", vendorFirmName);
          setShowFirmTitle(false);
        }
      }

      // ✅ Important Fix
      setShowLogOut(true);
      setShowFirm(true);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3 className="Vendor-Top">Vendor Login</h3>

        <label>Email</label>
        <input
          type="text"
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
