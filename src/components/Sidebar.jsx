
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Modal from "./Modal";

export default function Sidebar({ onSelectFolder }) {
  const { folders, setFolders, activeFolder, setActiveFolder } = useContext(AppContext);
  const [modal, setModal] = useState({ visible: false, type: "", folder: null });
  const [newName, setNewName] = useState("");

  const openModal = (type, folder) => {
    setModal({ visible: true, type, folder });
    setNewName(folder?.name || "");
  };

  const closeModal = () => setModal({ visible: false, type: "", folder: null });

  const renameFolder = () => {
    const updated = folders.map(f => f === modal.folder ? { ...f, name: newName } : f);
    setFolders(updated);
    closeModal();
  };

  const deleteFolder = () => {
    setFolders(folders.filter(f => f !== modal.folder));
    closeModal();
  };

  return (
    <div className="sidebar">
      <h3>Folders</h3>
      {folders.map((folder, i) => (
        <div
          key={i}
          className={`folder-item ${activeFolder === folder ? "active" : ""}`}
        >
          <span onClick={() => {
            setActiveFolder(folder);
            onSelectFolder(folder);
          }}>
            {folder.name}
          </span>
          <div className="folder-actions">
            <button onClick={() => openModal("rename", folder)}>✏️</button>
            <button onClick={() => openModal("delete", folder)}>🗑️</button>
          </div>
        </div>
      ))}

      {modal.visible && (
        <Modal
          type={modal.type}
          folder={modal.folder}
          newName={newName}
          setNewName={setNewName}
          onClose={closeModal}
          onRename={renameFolder}
          onDelete={deleteFolder}
        />
      )}
    </div>
  );
}

