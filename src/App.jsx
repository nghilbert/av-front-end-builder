// useRef is a hook used for DOM references
// useEffect is a hook used for running side effects like initializing GrapesJS
import React, { useEffect, useRef } from "react";

//GrapesJS imports
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import basicBlocks from "grapesjs-blocks-basic";
import formsPlugin from "grapesjs-plugin-forms";
import customCodePlugin from "grapesjs-custom-code";

// Local imports
import { fetchBlocks } from "./blocks.js";
import {
  saveLocally,
  downloadJSON,
  downloadHTML,
  downloadCSS,
  downloadAll,
  importJSON,
} from "./editorUtils.js";

// Create app
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

  // Render the buttons and the editor container
  return (
    <>
      <div className="button-group">
        <button onClick={() => saveLocally(editorRef.current)}>
          Save Locally
        </button>

        <div className="dropdown">
          <button className="dropdown-toggle">Download ▼</button>
          <div className="dropdown-menu">
            <button onClick={() => downloadJSON(editorRef.current)}>
              JSON
            </button>
            <button onClick={() => downloadHTML(editorRef.current)}>
              HTML
            </button>
            <button onClick={() => downloadCSS(editorRef.current)}>CSS</button>
            <button onClick={() => downloadAll(editorRef.current)}>All</button>
          </div>
        </div>

        <button onClick={() => document.getElementById("import-json").click()}>
          Import JSON
        </button>
        <input
          type="file"
          accept=".json"
          id="import-json"
          style={{ display: "none" }}
          onChange={(e) => importJSON(e, editorRef.current)}
        />
      </div>

      <div ref={containerRef}></div>
    </>
  );
};

export default App;
