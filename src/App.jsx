import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

const App = () => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("touchpad-ui");

    const editor = grapesjs.init({
      container: containerRef.current,
      height: "100vh",
      width: "100vw",
      fromElement: false,
      storageManager: {
        type: "local",
        autosave: false,
        autoload: false,
      },
      components: saved ? JSON.parse(saved).components : "<h1>Edit me!</h1>",
      style: saved ? JSON.parse(saved).style : "",
    });

    editor.BlockManager.add("custom-button", {
      label: "Button",
      category: "Basic",
      content: '<button class="my-button">Click me</button>',
    });

    editor.Panels.addButton("views", {
      id: "open-blocks",
      label: "📦",
      command: "open-blocks",
      togglable: false,
    });

    editor.Commands.run("open-blocks");

    editorRef.current = editor;

    return () => editor.destroy();
  }, []);

  const handleSave = () => {
    const editor = editorRef.current;
    if (editor) {
      const json = {
        components: editor.getComponents(),
        style: editor.getCss(),
      };
      localStorage.setItem("touchpad-ui", JSON.stringify(json));
      alert("Saved to localStorage");
    }
  };

  return (
    <>
      <button
        onClick={handleSave}
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "1rem",
          zIndex: 9999,
        }}
      >
        Save
      </button>
      <div ref={containerRef}></div>
    </>
  );
};

export default App;
