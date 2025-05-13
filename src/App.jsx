// useRef is a hook used for DOM references
// useEffect is a hook used for DOM references
import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

const App = () => {
  // Initialize a reference to the the GrapesJS editor interface
  const editorRef = useRef(null);
  // Initialize a container to hold GrapesJS editor interface 
  const containerRef = useRef(null);

  useEffect(() => {
    // Attempt to load a saved proejct from localStorage
    const saved = localStorage.getItem("touchpad-ui");

    // Create an editor instance with GrapesJS
    const editor = grapesjs.init({
      // Renders inside this container
      container: containerRef.current, 
      height: "100vh",
      width: "100vw",
      fromElement: false,

      // Using localStorage for now. Auto save and auto load disabled
      storageManager: {
        type: "local",
        autosave: false,
        autoload: false,
      },

      // Load saved or default components
      components: saved ? JSON.parse(saved).components : "<h1>Edit me!</h1>",
      style: saved ? JSON.parse(saved).style : "",
    });

    // Add a custom block (button)
    editor.BlockManager.add("custom-button", {
      label: "Button",
      category: "Basic",
      content: '<button class="my-button">Click me</button>',
    });

    // Open the blocks panel on editor startup
    editor.Commands.run("open-blocks");
    
    // Save editor instance to editorRef
    editorRef.current = editor;

    // Destroy the editor when the component unmounts
    return () => editor.destroy();
  }, []);

  // Handles saving the current state to localStorage
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

  // Render the save button and the editor container
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
