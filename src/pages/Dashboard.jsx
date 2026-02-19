import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

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

  const handleFolderSelect = (folder) => {
    setActiveFolder(folder);
    navigate("/editor");
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
            {folders.map((folder, i) => (
              <div
                key={i}
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
