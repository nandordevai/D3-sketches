const config = {
    chartWidth: 500,
    chartHeight: 300,
    barPadding: 1,
};

const data = Array.from({ length: 10 }, () => Math.random() * 100);

const BarChart = {
    init() {
        this.barWidth = this.chartWidth / this.data.length - this.barPadding * 2;
        this.xScale = d3.scaleOrdinal().domain([0, this.data.length]).range([0, this.chartWidth]);
        this.yScale = d3.scaleLinear().domain([0, 100]).range([this.chartHeight, 0]);
        this.yAxis = d3.axisLeft().scale(this.yScale);
        this.xAxis = d3.axisBottom().scale(this.xScale);
        this.chart = d3.select('#chart');
        this.chart
            .attr('width', this.chartWidth)
            .attr('height', this.chartHeight)
            .classed('chart', true);
        return this;
    },

    draw() {
        this.chart
            .selectAll('rect')
            .data(this.data)
            .enter()
            .append('rect')
            .classed('bar-odd', (_, i) => !(i % 2))
            .classed('bar-even', (_, i) => i % 2)
            .attr('width', this.barWidth)
            .attr('opacity', .5)
            .attr('x', (_, i) => i * (this.barWidth + this.barPadding * 2))
            .attr('y', d => this.yScale(d))
            .attr('height', _ => this.chartHeight - this.yScale(_));

        this.chart
            .selectAll('text')
            .data(this.data)
            .enter()
            .append('text')
            .text(d => d3.format('.1f')(d))
            .attr('x', (_, i) => (i + 0.5) * (this.barWidth + this.barPadding * 2))
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10)
            .attr('y', d => this.yScale(d) - 10);

        this.chart
            .append('g')
            .call(this.xAxis)
            .attr('transform', `translate(0, ${this.chartHeight})`);

        this.chart.append('g').call(this.yAxis);
        return this;
    },
};

const AnimatedBarChart = {
    animate() {
        this.chart
            .selectAll('rect')
            .attr('y', this.chartHeight)
            .attr('height', 0)
            .transition()
            .delay((d, i) => i * 50)
            .attr('y', d => this.yScale(d))
            .attr('height', _ => this.chartHeight - this.yScale(_));
        return this;
    }
}

const InteractiveBarChart = {
    interactive() {
        this.chart
            .selectAll('rect')
            .on('mouseover', () => {
                d3.select(d3.event.currentTarget)
                    .transition()
                    .attr('opacity', 1);
            })
            .on('mouseout', () => {
                this.chart
                    .selectAll('rect')
                    .transition()
                    .attr('opacity', .5);
            });
        return this;
    },
};

const chart = Object.assign({}, { ...config }, { data }, BarChart, AnimatedBarChart, InteractiveBarChart);
chart.init().draw().animate().interactive();

// const chart = Object.assign({}, { ...config }, { data }, BarChart, InteractiveBarChart);
// chart.init().draw().interactive();
