/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
height = window.innerHeight * 0.7,
margin = { top: 20, bottom: 60, left: 60, right: 40 },
radius = 10;

// // since we use our scales in multiple functions, they need global scope
let xScale, yScale;

/* APPLICATION STATE */
let state = {
  data: [],
};

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType).then(raw_data => {
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
  xScale = d3.scaleBand()
    .domain(state.data.map(d => d.activity))
    .range([margin.left, width - margin.right])
    .paddingInner(0.2)
  
  yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d => d.count)])
    .range([height - margin.bottom, margin.top])

  //define svg
  const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  


  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  /* HTML ELEMENTS */
 


}