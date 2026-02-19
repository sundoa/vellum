import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CustomContextMenu from "../components/CustomContextMenu";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";

export default function Editor() {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const folder = location.state?.folder;
  const [currentDoc, setCurrentDoc] = useState({ name: "Untitled", content: "" });
  const [menu, setMenu] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: currentDoc.content || "<p>Start writing...</p>",
    onUpdate: async ({ editor }) => {
      const updatedContent = editor.getHTML();
      setCurrentDoc(prev => ({ ...prev, content: updatedContent }));

      if (user && folder) {
        const folderRef = doc(db, "users", user.uid, "folders", folder.id);
        await setDoc(folderRef, {
          ...folder,
          docs: [{ name: currentDoc.name, content: updatedContent }],
        });
      }
    },
  });

  const downloadFile = () => {
    if (!editor) return;
    const blob = new Blob([editor.getText()], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${currentDoc.name}.txt`;
    link.click();
  };

  return (
    <>
      <Navbar downloadFile={downloadFile} />
      <div className="editor-page fade">
        <Sidebar onSelectFolder={() => {}} />
        <div
          className="editor-wrapper"
          onContextMenu={(e) => {
            e.preventDefault();
            setMenu({ x: e.pageX, y: e.pageY });
          }}
        >
          <EditorContent editor={editor} className="editor" />

          {menu && (
            <CustomContextMenu
              x={menu.x}
              y={menu.y}
              close={() => setMenu(null)}
              editor={editor}
            />
          )}
        </div>
      </div>
    </>
  );
}
