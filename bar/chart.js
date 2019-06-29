const zip = (left, right) => left.reduce((acc, curr, i) => {
    acc.push(curr, right[i]);
    return acc;
}, []);
const chartWidth = 500;
const chartHeight = 300;
const barPadding = 1;
const rand = (length) => [...Array(length).keys()].map(_ => Math.random() * 100);
const data1 = rand(5);
// const data2 = rand(5);
const data2 = [1, 10, 50, 75, 100];
const data = zip(data1, data2);
const barWidth = chartWidth / data.length - (barPadding * 2);

const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([chartHeight, 0]);

const yAxis = d3.axisLeft()
      // .tickSize(chartWidth)
      .scale(yScale);

const xScale = d3.scaleOrdinal()
      .domain([0, data.length])
      .range([0, chartWidth]);

const xAxis = d3.axisBottom()
      .scale(xScale);

const chart = d3.select('#chart')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .classed('chart', true);

chart.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .classed('bar-odd', (_, i) => !(i % 2))
    .classed('bar-even', (_, i) => i % 2)
    .attr('width', barWidth)
    .attr('height', _ => chartHeight - yScale(_))
    .attr('x', (_, i) => i * (barWidth + (barPadding * 2)))
    .attr('y', d => yScale(d));

chart.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d3.format('.1f')(d))
    .attr('x', (_, i) => (i + 0.5) * (barWidth + (barPadding * 2)))
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('y', d => yScale(d) - 10);

chart.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${chartHeight})`);

chart.append('g')
    .call(yAxis);
