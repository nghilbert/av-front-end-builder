// GrapesJS imports
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
  importJSON,
} from "./editorUtils.js";

// Start once the webpage has loaded
document.addEventListener("DOMContentLoaded", () => {
  // Define the container that holds the GrapeJS editor
  const container = document.getElementById("editor-container");
  // Collect saved JSON from localStorage
  const saved = localStorage.getItem("touchpad-ui");

  // Create an editor instance with GrapesJS
  const editor = grapesjs.init({
    // Set canvas to be the size of a standard touchpad
    container,
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

    // Add GrapesJS plugin components
    plugins: [basicBlocks, formsPlugin, customCodePlugin],
  });

  // Add custom blocks from blocks.js
  fetchBlocks(editor);

  // Assign actions to each button
  document.getElementById("save-btn").onclick = () => saveLocally(editor);
  document.getElementById("json-btn").onclick = () => downloadJSON(editor);
  document.getElementById("html-btn").onclick = () => downloadHTML(editor);
  document.getElementById("css-btn").onclick = () => downloadCSS(editor);
  document.getElementById("import-json").onchange = (e) =>
    importJSON(e, editor);
});
