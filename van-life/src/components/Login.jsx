import React from "react";
import "../components/pages/styles/Login.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, registerUser, getUserRoleByEmail } from "../apiFirebase";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState("idle");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/host";

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getUserRoleByEmail(user.email);
          const role = userDoc?.role;

          if (role === "admin") {
            navigate("/admin");
          } else if (role === "host") {
            navigate("/host");
          } else {
            navigate("/", {
              state: { message: "Unknown role. Access denied." },
            });
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
          navigate("/", { state: { message: "Error determining user role." } });
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginFormData.email,
        loginFormData.password
      );

      const user = userCredential.user;
      const userDoc = await getUserRoleByEmail(user.email);
      const role = userDoc?.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "host") {
        navigate("/host");
      } else {
        navigate("/", { state: { message: "Unknown role. Access denied." } });
      }
    } catch (error) {
      if (error.code === "auth/network-request-failed") {
        setError({ message: "Network error: Please check your connection." });
      } else if (error.code === "auth/wrong-password") {
        setError({ message: "Incorrect password. Please try again." });
      } else if (error.code === "auth/user-not-found") {
        setError({ message: "No account found with this email." });
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  }

  if (status === "submitting")
    return (
      <h2 style={{ color: "brown" }} aria-live="polite">
        Logging in...
      </h2>
    );
  if (error)
    return (
      <h2 style={{ color: "red" }} aria-live="assertive">
        ERROR:
        {error.message}
      </h2>
    );

  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-first">{location.state.message}</h3>
      )}

      <h1>Sign in</h1>

      {error && (
        <p className="login-error" aria-live="assertive">
          ⚠️ {error.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
          required
        />
        <br />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
          required
        />
        <button disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
