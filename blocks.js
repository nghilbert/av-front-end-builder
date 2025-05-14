const customBlocks = [
  {
    id: "volume-slider",
    label: "Volume Slider",
    category: "Custom",
    content: {
      tagName: "input",
      type: "range",
      attributes: {
        type: "range",
        min: "0",
        max: "100",
        value: "50",
        step: "1",
        class: "volume-slider",
        style:
          "writing-mode: bt-lr; -webkit-appearance: slider-vertical; appearance: slider-vertical; height: 300px;",
      },
    },
  },
  {
    id: "live-clock",
    label: "Live Clock",
    category: "Custom",
    content: {
      tagName: "div",
      attributes: {
        class: "live-clock",
      },
      content: "00:00", // placeholder

      // Script starts when the component is rendered in the canvas
      script: function () {
        // Initialize a reference to this element
        const element = this;

        // Function to update the date/time
        const updateTime = () => {
          // Format the time string
          const now = new Date();
          let hours = now.getHours(); // Not constant to rewrite to 12 hour time
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const timeString = `${hours}:${minutes} ${isPM ? "PM" : "AM"}`;

          // Format date string
          const dateString = now.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          // Write date and time to the element
          element.innerHTML = `${timeString}<br>${dateString}`;
        };

        // Initialize the date/time and update every 1 second
        updateTime();
        setInterval(updateTime, 1000);
      },
    },
  },
  {
    id: "room-label",
    label: "Room Label",
    category: "Custom",
    content: {
      tagName: "div",
      attributes: {
        class: "room-label",
      },
      content: "xxx-xxx", // placeholder
    },
  },
  // Add more blocks as needed
];

// Function to export blocks into the App
export function fetchBlocks(editor) {
  customBlocks.forEach((block) => {
    editor.BlockManager.add(block.id, block);
  });
}
