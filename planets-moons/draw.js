const height = 1800;
const columnWidth = 100;
let activePlanet = 0;
let labelsVisible = false;

d3.json('planets.json')
    .then(showChart);

function grey(value) {
    return `rgb(${Array(3).fill(value).join(',')})`;
}

function hideLabels(i) {
    if (!labelsVisible) {
        return;
    }
    d3.select(`.planet:nth-child(${i})`)
        .selectAll('.label.moon')
        .style('opacity', 1)
        .transition()
        .duration(300)
        .style('opacity', 0);
    labelsVisible = false;
    activePlanet = 0;
}

function showChart(planets) {
    const fillColors = i => {
        return `rgb(${Array(3).fill(150 + i * 40).join(', ')})`;
    };
    const maxRadius = d3.max(planets.reduce((acc, curr) => {
        acc.push(curr.diameter / 2);
        return acc;
    }, []));
    const scale = d3.scaleLinear()
        .domain([0, maxRadius])
        .range([0, 110]);
    const chart = d3.select('#chart')
        .attr('width', planets.length * columnWidth)
        .attr('height', height);
    chart.on('mousemove', () => {
        if (event.pageY < 500) {
            hideLabels(activePlanet);
        } else {
            const planetPosition = Math.ceil(event.pageX / columnWidth);
            if (planetPosition !== activePlanet) {
                hideLabels(activePlanet);
                activePlanet = planetPosition;
                d3.select(`.planet:nth-child(${activePlanet})`)
                    .selectAll('.label.moon')
                    .style('opacity', 0)
                    .transition()
                    .duration(150)
                    .style('opacity', 1);
                labelsVisible = true;
            }
        }
    });

    const planet = chart.selectAll('g')
        .data(planets)
        .enter().append('g')
        .classed('planet', true)
        .attr('width', columnWidth)
        .attr('height', height)
        .attr('transform', (_, i) => `translate(${i * columnWidth + 40}, 320)`);
    planet.append('circle')
        .attr('cy', _ => scale(maxRadius) - scale(_.diameter / 2) - 160)
        .attr('r', _ => scale(_.diameter / 2))
        .style('fill', (_, i) => fillColors(i % 3));
    planet.append('text')
        .classed('label', true)
        .attr('y', -20)
        .text(_ => _.name);
    planet.selectAll('g')
        .data(_ => _.moons)
        .enter().append('circle')
        .attr('cy', (_, i) => i * 10)
        .attr('r', (_, i) =>  (i % 10 === 9 && i > 0) ? 2 : 1)
        .style('fill', grey(200));
    planet.selectAll('g')
        .data(_ => _.moons)
        .enter().append('text')
        .classed('label', true)
        .classed('moon', true)
        .classed('left', (_, i) => i % 2)
        .classed('right', (_, i) => !(i % 2))
        .attr('opacity', 0)
        .attr('y', (_, i) => i * 10 + 3)
        .attr('x', (_, i) => i % 2 ? 5 : -5)
        .text(_ => _);
}
