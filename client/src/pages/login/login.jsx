import React, { useState } from "react";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = () => {
    alert("submit");
  };
  return (
    <div className="login">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={({ currentTarget }) => setEmail(currentTarget.value)}
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={({ currentTarget }) => setPassword(currentTarget.value)}
          />
        </div>
        <button className="login__submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
