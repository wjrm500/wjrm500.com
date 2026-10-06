// Turns an image followed by an italic line in the same paragraph into a captioned figure:
//
//   ![Alt text](./photo.png)
//   _The caption, which may contain [links](https://example.com)_
//
// A lone image in its own paragraph also becomes a <figure>, just without a caption.
export default function rehypeFigure() {
  return (tree) => visit(tree);
}

function visit(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'element' && child.tagName === 'p') {
      const kids = child.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
      const [img, cap] = kids;
      if (img?.type === 'element' && img.tagName === 'img') {
        if (kids.length === 1) return fig([img]);
        if (kids.length === 2 && cap.type === 'element' && cap.tagName === 'em') {
          return fig([img, { type: 'element', tagName: 'figcaption', properties: {}, children: cap.children }]);
        }
      }
    }
    visit(child);
    return child;
  });
}

const fig = (children) => ({ type: 'element', tagName: 'figure', properties: {}, children });
