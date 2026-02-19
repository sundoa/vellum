import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { AppContext } from "../context/AppContext";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSignup = async () => {
    if (!form.username || !form.email || !form.password) return alert("Fill all fields");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const firebaseUser = userCredential.user;
      setUser(firebaseUser);

      // Save username to Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), { username: form.username });
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
