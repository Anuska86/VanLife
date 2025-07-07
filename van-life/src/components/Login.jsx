import React from "react";
import "../components/pages/styles/Login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function loadFormData() {
      setLoading(true);
      try {
        const data = await loginUser();
        setLoginFormData(data); // Assuming this is how you want to update form data
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadFormData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-first">{location.state.message}</h3>
      )}

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
