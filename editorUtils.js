// Handles saving the current state to localStorage (stored with JSON)
export const saveLocally = (editor) => {
  if (!editor) return;

  // Define a variable for the HTML, CSS and components
  const layoutData = {
    name: "Touchpanel Layout", // hardcoded for now
    // Get raw HTML and CSS
    html: editor.getHtml(),
    css: editor.getCss(),

    //Get components
    components: editor.getComponents().map((c) => c.toJSON()),
    style: editor.getStyle(),
  };

  /* Fetch layout and post to DJango model (commented out for now)
  fetch("/api/save-layout/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(layoutData),
  });
  */

  // Save layoutData to localStorage
  localStorage.setItem("touchpad-ui", JSON.stringify(layoutData));
  alert("Saved to localStorage");
};

// Handles downloading the current state (stored with JSON)
export const downloadJSON = (editor) => {
  if (!editor) return;

  // Define a variable for the HTML, CSS and components
  const layoutData = {
    name: "Touchpanel Layout",
    html: editor.getHtml(),
    css: editor.getCss(),
    components: editor.getComponents(),
    style: editor.getStyle(),
  };

  // Convert to JSON
  const blob = new Blob([JSON.stringify(layoutData, null, 2)], {
    type: "application/json",
  });

  // Make a download anchor from the blob
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "touchpanel_layout.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadHTML = (editor) => {
  if (!editor) return;

  // Get HTML
  const html = editor.getHtml();
  const blob = new Blob([html], { type: "text/html" });

  // Make a download anchor from the blob
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "touchpanel_layout.html";
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadCSS = (editor) => {
  if (!editor) return;

  // Get CSS
  const css = editor.getCss();
  const blob = new Blob([css], { type: "text/css" });

  // Make a download anchor from the blob
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "touchpanel_layout.css";
  a.click();
  URL.revokeObjectURL(url);
};

//TODO: add comments
export const importJSON = (event, editor) => {
  const file = event.target.files[0];
  if (!file || !editor) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      editor.setComponents(data.components);
      editor.setStyle(data.style);
      alert("Layout imported!");
    } catch (err) {
      alert("Failed to import layout: " + err.message);
    }
  };

  reader.readAsText(file);
};
