/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

// SHOW LOADING SCREEN FOR AT MOST 2.5 SECONDS
const loadingScreen = d3.select("#loading-screen")
  .style("display", "block");
setTimeout(() => {
  loadingScreen.style("display", "none");

  /*LOAD DATA*/
  const colorScale = d3.scaleOrdinal()
  .domain(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
  .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#CCCCCC']);

  Promise.all([
    d3.json("../data/Borough_Boundaries.geojson"),
    d3.csv("../data/DrinkingFountains_20190417.csv", d3.autoType),
  ]).then(([geojson, drinkingFountains]) => {
    console.log('drinkingFountains', drinkingFountains);

    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg.append("text")
      .attr("x", (width / 3.5))
      .attr("y", margin.top * 2)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .style("fill", "#08415C")
      .text("NYC Drinking Fountains");

    // SPECIFY PROJECTION
    const projection = d3.geoMercator()
      .fitSize([width, height], geojson)

    // DEFINE PATH FUNCTION
    const pathGen = d3.geoPath(projection)

    // APPEND GEOJSON PATH
    const boroughs = svg.selectAll("path.boroughs")
      .data(geojson.features)
      .join("path")
      .attr("class", "boroughs")
      .attr("d", coords => pathGen(coords))
      .attr("fill", "#EEE5E9")
      .attr("stroke", "#08415C");

// APPEND DATA AS SHAPE
const colorScale = d3.scaleOrdinal()
  .domain(['A', 'B', 'C', 'D', 'E', 'F'])
  .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b']);

const drinkingFountainsShapes = svg.selectAll("circle.drinkingFountainsShapes")
  .data(drinkingFountains)
  .join("circle")
  .attr("class", "drinkingFountainsShapes")
  .attr("r", 2)
  .attr("transform", (d) => {
    const [x, y] = projection([d.LONGITUDE, d.LATITUDE]);
    return `translate(${x}, ${y})`;
  })
  .attr("fill", d => colorScale(d.TYPE))
  .on("mouseover", function (event, d) {
    const tooltip = d3.select("#tooltip");
    tooltip.style("display", "block");
    tooltip.html(`<p><strong>Description:</strong> ${d.DESCRIPTION}</p><p><strong>Sign Name:</strong> ${d.SIGNNAME}</p>`);
    tooltip.style("left", event.pageX + 10 + "px");
    tooltip.style("top", event.pageY + 10 + "px");
  })
  .on("mouseout", function () {
    const tooltip = d3.select("#tooltip");
    tooltip.style("display", "none");
  });


// ADD LEGEND
const legendData = [
    { type: 'A', label: 'Rectangular Fountain' },
    { type: 'B', label: 'Circular Fountain' },
    { type: 'C', label: 'Circular Fountain with Overhang' },
    { type: 'D', label: 'Rectangular Fountain with Overhang' },
    { type: 'E', label: 'Wheelchair-Accessible Fountain' },
    { type: 'F', label: 'Bottle-Filling Fountain' },
    { type: 'G', label: 'Unknown' },
  ];

  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const legendItems = legend.selectAll('.legend-item')
    .data(legendData)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(0, ${i * 20})`);

  legendItems.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', d => colorScale(d.type));

  legendItems.append('text')
    .attr('x', 20)
    .attr('y', 9)
    .text(d => `${d.type}: ${d.label}`)
    .style('font-size', '12px')
    .style('fill', '#333');

});
}, 2500); //2.4 SECOND DELAY BEFORE LOADING THE MAP