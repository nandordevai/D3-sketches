let maxGrossUSD = null;
let maxRating = null;

d3.json('./imdb-top1000.json')
  .then((data) => {
    const slice = data.filter(_ => _.year >= 2017 && _.metascore !== '');
    maxGrossUSD = d3.max(slice.map(_ => _.gross_usd));
    maxRating = d3.max(slice.map(_ => _.metascore));
    const movies = d3.nest()
      .key(d => d.year)
      .key(d => d.genre.split(', ')[0])
      .entries(slice);
    const root = d3.hierarchy(
      {
        title_eng: 'IMDB Top',
        values: movies,
      },
      d => d.values);
    const treeLayout = d3.tree();
    treeLayout.size([800, 1000]);
    treeLayout(root);
    draw(root);
  });

  function nodeSize(d) {
    const ratingScale = d3.scaleLinear([0, maxRating], [1, 25]);
    return d.data.metascore ? ratingScale(d.data.metascore) : 10;
}

function draw(root) {
  // Nodes
  const movies = d3.select('svg g.nodes')
    .selectAll('g')
    .data(root.descendants())
    .join(
      (enter) => enter
        .append('g')
    );

  movies.append('circle')
    .classed('node', true)
    .classed('leaf', d => d.data.metascore)
    .attr('cx', d => d.y + 10)
    .attr('cy', d => d.x + 10)
    .attr('r', d => `${nodeSize(d)}px`);

  movies.append('text')
    .text(d => d.data.title_eng || d.data.key)
    .attr('x', d => d.data.title_eng ? d.y + 40 : d.y - 10)
    .attr('y', d => d.x + 10)
    .classed('title', d => d.data.title_eng)

  // Links
  const link = d3.linkHorizontal()
    .x(d => d.y + 10)
    .y(d => d.x + 10);

  const grossScale = d3.scaleLinear([0, maxGrossUSD], [1, 30]);

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
        .attr('stroke-width', d => `${d.target.data.gross_usd ? grossScale(d.target.data.gross_usd) : 1}px`)
    );
}