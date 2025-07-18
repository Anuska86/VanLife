import React, { useContext } from "react";
import "../../components/pages/styles/DevLogin.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../users/UserContext";
import { getUserProfile } from "../../apiFirebase";

export default function DevLogin() {
  const [selectedUid, setSelectedUid] = React.useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const testUsers = [
    {
      uid: "3sCum1Ef90DmG6tkx1vN",
      email: "host1@example.com",
      alias: "Host One",
    },
    {
      uid: "3sLEFh59IZPCK11nPyp9",
      email: "host2@example.com",
      alias: "Host Two",
    },
  ];

  const handleLogin = async () => {
    const user = testUsers.find((u) => u.uid === selectedUid);
    if (!user) return;

    const profile = await getUserProfile(user.uid);
    setUser({ uid: user.uid, email: user.email, ...profile });
    console.log(`Logged in as ${profile.alias}`);
    navigate("/host");
  };

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
