/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7;
const height = window.innerHeight * 0.7;
const margin = { top: 20, bottom: 60, left: 60, right: 40 };
const radius = 10;

// since we use our scales in multiple functions, they need global scope
let xScale, yScale;

/* APPLICATION STATE */
let state = {
  data: [],
};

/* LOAD DATA */
d3.csv('../data/NASAshuttle.csv', d3.autoType).then(raw_data => {
  console.log("raw_data", raw_data);
  // save our data to application state
  state.data = raw_data;
  console.log('state.data')
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  /* SCALES */
  xScale = d3.scaleLinear()
    .domain([1981, 1993])
    .range([margin.left, width - margin.right])
  
  yScale = d3.scaleBand()
    .domain(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
    .range([height - margin.bottom, margin.top])
    .paddingInner(0.2)
  
  //define svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  
  /* HTML ELEMENTS */
  const dot = svg.selectAll(".dot")
    .data(state.data)
    .join("circle")
    .attr("class", "dot")
    .attr("r", radius)
    .attr("cx", d => xScale(d.Year))
    .attr("cy", d => yScale(d.Month))
    .attr("fill", "#FC3D21")
    .attr("stroke", "#0B3D91")
    .attr("stroke-width", 0.5)
    .on("mouseover", function() {
      d3.select(this)
        .attr("r", radius * 2)
        .attr("filter", "url(#drop-shadow)")
    })
    .on("mouseout", function() {
      d3.select(this)
        .attr("r", radius)
        .attr("filter", "none")
    })
    .append("title")
    .text(d => `${d.Mission}`);

  svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
  
  svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale))
  
  svg.append("defs")
    .append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%")
    .attr("width", "130%")
    .attr("x", "-15%")
    .attr("y", "-15%")
    .append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3)
    .attr("result", "blur");

  draw();
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  // Here you would update the HTML elements based on
}

