export default function Navbar({ downloadFile }) {
  const user = localStorage.getItem("vellumUser");

  return (
    <div className="navbar">
      <div>Vellum</div>
      <div>
        <span>{user}</span>
        <button onClick={downloadFile}>Download</button>
      </div>
    </div>
  );
}

