import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (email) {
      localStorage.setItem("vellumUser", email);
      navigate("/editor");
    }
  };

  return (
    <div className="auth-container">
      <h1>Vellum</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/signup")}>Create Account</p>
    </div>
  );
}

