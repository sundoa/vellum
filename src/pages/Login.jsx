import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("vellumUser"));
    if (
      storedUser &&
      storedUser.email === form.email &&
      storedUser.password === form.password
    ) {
      setUser(storedUser);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container fade">
      <h1>Vellum</h1>
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
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/signup")}>Create Account</p>
    </div>
  );
}
