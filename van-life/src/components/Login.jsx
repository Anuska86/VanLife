import React from "react";
import "../components/pages/styles/Login.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  const [mustLoginMess, setMustLoginMess] = React.useState(
    () => location.state?.message || ""
  );

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  }

  React.useEffect(() => {
    if (mustLoginMess) {
      const timer = setTimeout(() => setMustLoginMess(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [mustLoginMess]);

  if (location.state) {
    return location.state.message;
  }

  return (
    <div className="login-container">
      {mustLoginMess && <h1>{mustLoginMess}</h1>}

      <h1>Sign in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email adress"
          value={loginFormData.email}
        />
        <br />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}
