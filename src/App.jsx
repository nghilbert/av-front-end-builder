// useRef is a hook used for DOM references
// useEffect is a hook used for running side effects like initializing GrapesJS
import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import basicBlocks from "grapesjs-blocks-basic";
import formsPlugin from "grapesjs-plugin-forms";
import customCodePlugin from "grapesjs-custom-code";
import { fetchBlocks } from "./blocks.js";

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
      // Set canvas to be the size of a standard touchpad
      container: containerRef.current,
      width: "1024px",
      height: "600px",

      // Using localStorage for now. Auto save and auto load disabled
      storageManager: {
        type: "local",
        autosave: false,
        autoload: false,
      },

      // Load saved or default components
      fromElement: false,
      components: saved ? JSON.parse(saved).components : "<h1>Edit me!</h1>",
      style: saved ? JSON.parse(saved).style : "",

      // Add plugin components
      plugins: [basicBlocks, formsPlugin, customCodePlugin],
    });

    // fetch custom blocks from blocks.js
    fetchBlocks(editor);

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
      <button onClick={handleSave}>Save</button>
      <div
        ref={containerRef}
        style={{ margin: "0 auto", display: "block" }}
      ></div>
    </>
  );
};

export default App;
