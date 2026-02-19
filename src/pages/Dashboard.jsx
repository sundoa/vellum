import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const { user, folders } = useContext(AppContext);
  const navigate = useNavigate();
  const [newFolder, setNewFolder] = useState("");

  const createFolder = async () => {
    if (!newFolder || !user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "folders"), {
        name: newFolder,
        docs: [],
        createdAt: new Date(),
      });
      setNewFolder("");
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  const handleFolderSelect = (folder) => {
    navigate("/editor", { state: { folder } });
  };

  return (
    <>
      <Navbar />
      <div className="dashboard fade">
        <Sidebar onSelectFolder={handleFolderSelect} />
        <div className="dashboard-main">
          <h2>Create New Folder</h2>
          <div className="folder-create">
            <input
              placeholder="New folder name"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
            />
            <button onClick={createFolder}>Create</button>
          </div>

          <div className="folder-grid">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="folder-card"
                onClick={() => handleFolderSelect(folder)}
              >
                {folder.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
