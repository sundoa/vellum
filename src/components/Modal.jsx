export default function Modal({ type, folder, newName, setNewName, onClose, onRename, onDelete }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {type === "rename" && (
          <>
            <h2>Rename Folder</h2>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <button onClick={onRename}>Rename</button>
          </>
        )}
        {type === "delete" && (
          <>
            <h2>Delete Folder?</h2>
            <p>Are you sure you want to delete "{folder.name}"?</p>
            <button onClick={onDelete}>Delete</button>
          </>
        )}
        <button className="close" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

