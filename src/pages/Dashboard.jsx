import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { folders, setFolders, setActiveFolder } = useContext(AppContext);
  const [newFolder, setNewFolder] = useState("");
  const navigate = useNavigate();

  const createFolder = () => {
    if (newFolder) {
      setFolders([...folders, { name: newFolder, docs: [] }]);
      setNewFolder("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard fade">
        <h1>Your Folders</h1>

        <div className="folder-create">
          <input
            placeholder="New folder name"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
          />
          <button onClick={createFolder}>Create</button>
        </div>

        <div className="folder-grid">
          {folders.map((folder, i) => (
            <div
              key={i}
              className="folder-card"
              onClick={() => {
                setActiveFolder(folder);
                navigate("/editor");
              }}
            >
              {folder.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

