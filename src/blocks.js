export const basicBlocks = [
  // TODO: Volume Slider
  // Add more blocks as needed
];

export function fetchBlocks(editor) {
  basicBlocks.forEach((block) => {
    editor.BlockManager.add(block.id, block);
  });
}
