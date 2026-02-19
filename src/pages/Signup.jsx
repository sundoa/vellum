import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSignup = () => {
    if (email) {
      localStorage.setItem("vellumUser", email);
      navigate("/editor");
    }
  };

  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <p onClick={() => navigate("/")}>Back to Login</p>
    </div>
  );
}

