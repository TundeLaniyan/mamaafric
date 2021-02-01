import React, { useState } from "react";
import ReactSpinner from "react-loader-spinner";
import { login } from "../../services/adminService";
import "./login.scss";

const Login = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setStatus("");
    const status = await login({ email, password });
    setStatus(status);
    setPending(false);
    status === "success" &&
      setTimeout(() => {
        window.location = location.from ? location.from : "/";
      }, 2000);
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
        <div className="status">
          {pending ? (
            <ReactSpinner type="Circles" color="#e47b58" height={25} />
          ) : (
            <div className={`status--${status}`}>{status}</div>
          )}
        </div>
        <button className="login__submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
