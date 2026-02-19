import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      setUser(userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
