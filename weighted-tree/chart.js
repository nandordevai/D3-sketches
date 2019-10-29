import { data } from './data.js';

const root = d3.hierarchy(data);
const treeLayout = d3.tree();
treeLayout.size([600, 800]);
treeLayout(root);
const xOffset = 0;
const yOffset = 0;
const defaultColor = '#d8d8d8';

function toggleNode(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

const nodeScale = d3.scaleLinear([0, 1], [3, 40]);

function isLeaf(d) {
    return typeof d.children === 'undefined';
}

function getTextX(d) {
    return isLeaf(d)
        ? d.y + nodeScale(d.data.value) / 2 + 5
        : d.y - nodeScale(d.data.value) / 2 - 5;
}

update();

function update(source) {
    // Nodes
    const nodes = d3.select('svg g.nodes')
          .selectAll('g.node')
          .data(root.descendants(), d => d.data.rank);
    
    const node = nodes.enter().append('g')
          .classed('node', true)
          .attr('transform', `translate(${xOffset}, ${yOffset})`);
    nodes.exit().remove();

    node.append('circle')
        .attr('cx', d => d.y)
        .attr('cy', d => d.x)
        .attr('r', d => `${nodeScale(d.data.value) / 2}px`)
        .attr('fill', d => d.data.color || defaultColor)
        .on('click', toggleNode);

    node.append('text')
        .text(d => d.data.key)
        .attr('x', getTextX)
        .attr('y', d => d.x)
        .classed('leaf', isLeaf);

    // Links
    const link = d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x);

    d3.select('svg g.links')
        .selectAll('path.link')
        .data(root.links(), d => d.source.data.rank)
        .join(
            (enter) => enter
                .append('path')
                .classed('link', true)
                .attr('transform', `translate(${xOffset}, ${yOffset})`)
                .attr('x1', d => d.source.y)
                .attr('y1', d => d.source.x)
                .attr('x2', d => d.target.y)
                .attr('y2', d => d.target.x)
                .attr('d', link)
                .attr('stroke', d => d.target.data.color || defaultColor)
                .attr('opacity', 0.4)
                .attr('stroke-width', d => `${nodeScale(d.target.data.value)}px`),
            update => {},
            exit => exit.remove()
        );
}
