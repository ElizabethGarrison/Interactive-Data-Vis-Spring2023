/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 };

/* LOAD DATA */
d3.csv("../data/NASAshuttle.csv", d3.autoType).then(data => {
  console.log(data)

  /* SCALES */
  const xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
    .range([margin.left, width - margin.right]);

  const monthScale = d3.scaleBand()
    .domain(data.map(d => d.Month))
    .range([height - margin.bottom, margin.top])
    .padding(0.1);

  const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.Mission))
    .range(["#ffff99", "#b3d9ff", "#ffcc99", "#e6b3cc", "#cce6ff", "#b3b3ff", "#ff99cc", "#d9b3ff", "#ffb3b3"]);

  const radiusScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Mission.length))
    .range([3, 10]);

  /* HTML ELEMENTS */
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d"));

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(monthScale)
    .tickSize(0)
    .tickPadding(10);

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove());

  const dot = svg.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d.Year))
    .attr("cy", d => monthScale(d.Month))
    .attr("r", d => radiusScale(d.Mission.length))
    .attr("fill", d => colorScale(d.Mission))
    .on("mouseover", function(d) {
      d3.select(this)
        .attr("r", radiusScale(d.Mission.length) * 1.5)
        .append("title")
        .text(d.Mission);
    })
    .on("mouseout", function() {
      d3.select(this)
        .attr("r", radiusScale(d.Mission.length))
        .select("title")
        .remove();
    });

});



