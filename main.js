// GrapesJS imports
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import basicBlocks from "grapesjs-blocks-basic";
import formsPlugin from "grapesjs-plugin-forms";
import customCodePlugin from "grapesjs-custom-code";

// Local imports
import { fetchBlocks } from "./blocks.js";
import { save, downloadJSON, importJSON } from "./editorUtils.js";

// Start once the webpage has loaded
document.addEventListener("DOMContentLoaded", () => {
  // Define the container that holds the GrapeJS editor
  const container = document.getElementById("editor-container");
  // Collect saved JSON from localStorage
  const saved = localStorage.getItem("touchpad-ui");

  // Create an editor instance with GrapesJS
  const editor = grapesjs.init({
    // Define the editor container
    container,

    // Using localStorage for now. Auto save and auto load disabled
    storageManager: {
      type: "local",
      autosave: false,
      autoload: false,
    },

    // I there is a saved file in localStorage, load it
    if(saved) {
      const data = JSON.parse(saved);
      editor.setComponents(data.components);
      editor.setStyle(data.styles);

      // Reinject the global CSS (e.g. for body background)
      const styleTag = document.createElement("style");
      styleTag.innerHTML = data.css;
      editor.Canvas.getDocument().head.appendChild(styleTag);
    },

    // Add GrapesJS plugin components
    plugins: [basicBlocks, formsPlugin, customCodePlugin],
  });

  // Add custom blocks from blocks.js
  fetchBlocks(editor);

  // Assign actions to each button
  document.getElementById("save-btn").onclick = () => save(editor);
  document.getElementById("json-btn").onclick = () => downloadJSON(editor);
  document.getElementById("import-json").onchange = (e) =>
    importJSON(e, editor);
});
