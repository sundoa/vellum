import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useContext } from "react";
import CustomContextMenu from "../components/CustomContextMenu";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

export default function Editor() {
  const [menu, setMenu] = useState(null);
  const { activeFolder } = useContext(AppContext);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing...</p>",
  });

  const downloadFile = () => {
    const blob = new Blob([editor.getText()], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activeFolder?.name || "vellum-document"}.txt`;
    link.click();
  };

  return (
    <>
      <Navbar downloadFile={downloadFile} />
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
    </>
  );
}
