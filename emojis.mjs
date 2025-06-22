import { visit } from 'unist-util-visit';

// Regex now captures collection and name separately
const iconShorthandRegex = /:([a-z0-9-]+)-([a-z0-9-]+):/g;

/**
 * Remark plugin to transform :collection-name: into HTML spans for UnoCSS icons.
 */
export default function remarkIconShorthand() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return; // Ensure parent and index are valid

      const text = node.value;
      let lastIndex = 0;
      const newNodes = [];

      // Find all matches in the current text node
      for (const match of text.matchAll(iconShorthandRegex)) {
        const fullMatch = match[0];
        const collection = match[1]; // Captured group 1
        const name = match[2];       // Captured group 2
        const matchIndex = match.index;

        if (matchIndex === undefined || !collection || !name) continue;

        // Add preceding text node if any
        if (matchIndex > lastIndex) {
          newNodes.push({ type: 'text', value: text.slice(lastIndex, matchIndex) });
        }

        // Add the icon span node with enhanced classes
        newNodes.push({
          type: 'html',
          // Generate the final i-prefix class with our emoji classes
          value: `<span class="emoji i-${collection}-${name}" role="img" aria-label="${name}"></span>`,
        });

        lastIndex = matchIndex + fullMatch.length;
      }

      // If no matches were found, or if there's remaining text after the last match,
      // keep the original node or the remaining part
      if (newNodes.length === 0) {
        return; // No changes needed for this node
      }
      if (lastIndex < text.length) {
        newNodes.push({ type: 'text', value: text.slice(lastIndex) });
      }

      // Replace the original text node with the new nodes (text + html spans)
      parent.children.splice(index, 1, ...newNodes);

      // Return the index + number of new nodes - 1 to adjust visitor position
      return index + newNodes.length -1;
    });
  };
} 