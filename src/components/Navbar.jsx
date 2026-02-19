import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar({ downloadFile }) {
  const { user } = useContext(AppContext);

  return (
    <div className="navbar">
      <div>Vellum</div>
      <div>
        <span>{user?.username || user?.email}</span>
        {downloadFile && <button onClick={downloadFile}>Download</button>}
      </div>
    </div>
  );
}
