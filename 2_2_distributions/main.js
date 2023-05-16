/* CONSTANTS AND GLOBALS */
const margin = { top: 20, right: 30, bottom: 30, left: 60 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

/* LOAD DATA */
d3.csv("../data/NASAshuttle.csv", d3.autoType)
  .then(data => {
    console.log(data);

    // Calculate the mission duration
    data.forEach(d => {
      d.Duration = d3.timeParse("%M:%S")(d.Duration); // Assuming the duration is in the format "MM:SS"
    });

    // Create a scale for the star size based on the mission duration
    const sizeScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Duration))
      .range([20, 60]); // Adjust the range as needed

    /* CREATE SVG */
    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    /* CREATE SCALES */
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.Year))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.Month))
      .range([height, 0])
      .padding(0.1);

    /* CREATE AXES */
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

/* RENDER AXES */
svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-0.5em")
  .attr("dy", "-0.5em")
  .attr("transform", "rotate(-90)");

svg.append("g")
  .attr("class", "y-axis")
  .call(yAxis);


/* CREATE GRADIENT */
const gradient = svg
  .append("linearGradient")
  .attr("id", "star-gradient");

gradient.append("stop")
  .attr("class", "stop1")
  .attr("offset", "0%");

gradient.append("stop")
  .attr("class", "stop2")
  .attr("offset", "100%");

/* CREATE TOOLTIP */
const tooltip = d3.select("#container")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

/* MODIFY RENDER BARS */
svg.selectAll(".star")
  .data(data)
  .enter()
  .append("path")
  .attr("class", "star")
  .attr("d", d3.symbol().type(d3.symbolStar).size(60))
  .attr("transform", d => `translate(${xScale(d.Year) + xScale.bandwidth() / 2},${yScale(d.Month) + yScale.bandwidth() / 2})`)
  .attr("data-death", d => d.Death)
  .on("mouseover", (event, d) => {
    tooltip.transition()
      .duration(200)
      .style("opacity", 0.9);
    tooltip.html(d.Mission + "<br>Death: " + d.Death)
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .classed("red", d.Death === "Yes"); // Add 'red' class if Death is 'Yes'
  })
  .on("mouseout", () => {
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  });


});