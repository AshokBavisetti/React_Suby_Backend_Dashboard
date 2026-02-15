import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

export default function Register({ showLoginHandler }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      setUsername("");
      setEmail("");
      setPassword("");
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert(" vendor registered succesfully");
        showLoginHandler();
      }
    } catch (error) {
      console.error("registration failed", error);
      alert("registration failed");
    }
  };
  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3 className="Vendor-Top">Vendor Register</h3>

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="enter your name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password "
          placeholder="enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
