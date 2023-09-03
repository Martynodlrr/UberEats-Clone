import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./index.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  return (
    <>
      <div className="loginForm">
        <h1>Welcome back! Please log in:</h1>
        <form onSubmit={handleSubmit} id="formInfo">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            <input
              className="login-label"
              placeholder="Enter email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              className="login-label"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="loginSubmit">Log In</button>
        </form>
        <div id='other-buttons'>
        <p id="orTag">or</p>
        <button className="otherLoginButtons" onClick={() => dispatch(login("demo@aa.io", "password")).then(() => closeModal())}>Demo Login</button>
        {/* <button className="otherLoginButtons">Continue with Google</button>
        <button className="otherLoginButtons">Continue with Apple</button>
        <button className="otherLoginButtons">Continue with Facebook</button> */}
        <p>By proceeding, you consent to nothing as this is not a real website. We will not call you or send you emails.</p>

        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
