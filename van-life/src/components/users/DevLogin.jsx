import React, { useContext } from "react";
import "../../components/pages/styles/DevLogin.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../users/UserContext";
import { getUserProfile, getHostsData } from "../../apiFirebase";

export default function DevLogin() {
  const [selectedUid, setSelectedUid] = React.useState("");
  const [testUsers, setTestUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = testUsers.find((u) => u.uid === selectedUid);
    if (!user) return;

    const profile = await getUserProfile(user.uid);
    setUser({ uid: user.uid, email: user.email, ...profile });
    console.log(`Logged in as ${profile.alias}`);
    navigate("/host");
  };

  React.useEffect(() => {
    async function fetchTestUsers() {
      const hosts = await getHostsData();
      setTestUsers(hosts);
      setLoading(false);
    }
    fetchTestUsers();
  }, []);

  if (loading)
    return (
      <h2 style={{ color: "brown" }} aria-live="polite">
        Loading...
      </h2>
    );

  return (
    <div className="dev-login-container">
      <h2>🧪 Dev Login</h2>
      <select
        value={selectedUid}
        onChange={(e) => setSelectedUid(e.target.value)}
        className="dev-login-select"
      >
        <option value="">Select a test user</option>
        {testUsers.map((user) => (
          <option key={user.uid} value={user.uid}>
            {user.alias} ({user.email})
          </option>
        ))}
      </select>
      <button
        onClick={handleLogin}
        disabled={!selectedUid}
        className="dev-login-button"
      >
        Log In
      </button>
    </div>
  );
}
