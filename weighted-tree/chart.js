import { data } from './data.js';

const root = d3.hierarchy(data);
const treeLayout = d3.tree();
treeLayout.size([600, 600]);
treeLayout(root);

function nodeSize(d) {
  return Math.max(1, Math.round(d.data.rank / 5));
}

// Nodes
d3.select('svg g.nodes')
  .selectAll('circle.node')
  .data(root.descendants())
  .join(
    (enter) => enter
      .append('circle')
      .classed('node', true)
      .attr('cx', d => d.y)
      .attr('cy', d => d.x)
      .attr('r', d => `${nodeSize(d) / 2}px`)
  );

// Links
const link = d3.linkHorizontal()
  .x(d => d.y)
  .y(d => d.x);

d3.select('svg g.links')
  .selectAll('path.link')
  .data(root.links())
  .join(
    (enter) => enter
      .append('path')
      .classed('link', true)
      .attr('x1', d => d.source.y)
      .attr('y1', d => d.source.x)
      .attr('x2', d => d.target.y)
      .attr('y2', d => d.target.x)
      .attr('d', link)
      .attr('stroke-width', d => `${nodeSize(d.target)}px`)
  );