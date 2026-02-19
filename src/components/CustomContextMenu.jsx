export default function CustomContextMenu({ x, y, close, editor }) {
  return (
    <div
      className="context-menu"
      style={{ top: y, left: x }}
      onMouseLeave={close}
    >
      <div onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </div>
      <div onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </div>
      <div onClick={() => editor.chain().focus().toggleBulletList().run()}>
        Bullet List
      </div>
      <div onClick={() => editor.chain().focus().sinkListItem("listItem").run()}>
        Indent
      </div>
    </div>
  );
}
