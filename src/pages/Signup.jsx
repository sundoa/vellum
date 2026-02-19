import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSignup = () => {
    if (form.username && form.email && form.password) {
      localStorage.setItem("vellumUser", JSON.stringify(form));
      setUser(form);
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container fade">
      <h1>Create Account</h1>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <p onClick={() => navigate("/")}>Back to Login</p>
    </div>
  );
}
