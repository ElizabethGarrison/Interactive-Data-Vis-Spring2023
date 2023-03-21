// set the dimensions and margins of the graph
const margin = { top: 20, right: 30, bottom: 50, left: 60 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* LOAD DATA */
d3.csv("../data/cats.csv", d => {
  return {
    year: new Date(+d.Year, 0, 1),
    cats: +d["Number of Cats"]
  };
}).then(data => {
  console.log("data :>> ", data);

  /* SCALES */
  //X Scale
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right]);

  // Y Scale
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.cats)])
    .range([height - margin.bottom, margin.top]);

  /* HTML ELEMENTS */

  // BUILD AND CALL AXES
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis);

// AREA GENERATOR FUNCTION
const areaGen = d3.area()
  .x(d => xScale(d.year))
  .y0(height - margin.bottom)
  .y1(d => yScale(d.cats));

// DRAW AREA
const area = svg
  .append("path")
  .datum(data)
  .attr("class", "area")
  .attr("d", areaGen)
  .attr("fill", "lightpink")
  .attr("stroke", "black");

});
