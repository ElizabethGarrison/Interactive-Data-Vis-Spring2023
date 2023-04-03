/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
const height = window.innerHeight *.8 ;
const margin = 130;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)


    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    
    // xscale - linear, count
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d=> d.count)])
      .range([margin, width - margin]) // visual variable
    
    // yscale - band, activity
    const yScale = d3.scaleBand()
      .domain(data.map(d=> d.activity))
      .range([height - margin, margin])
      .paddingInner(.2)

    // color scale - ordinal, colors
    const color = d3.scaleOrdinal()
      .domain(data.map(d=> d.activity))
      .range(["#011627", "#2ec4b6", "#ff9f1c", "#e9d758", "#cda2ab"])

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */
    
    // svg
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // bars
    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("width", d=> xScale(d.count) - margin)
      .attr("height", yScale.bandwidth())
      .attr("x", margin)
      .attr("y", d=> yScale(d.activity))
      .attr("fill", d=> color(d.activity));

    // x-axis
    const xAxis = d3.axisBottom(xScale).ticks(5);
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis);

    // x-axis label
    svg.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width/2)
      .attr("y", height - margin/2)
      .text("Count");

    // y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
      .attr("transform", `translate(${margin}, 0)`)
      .call(yAxis);

    // y-axis label
    svg.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -height/2)
      .attr("y", margin/2)
      .text("Activity");

    // title
    svg.append("text")
      .attr("class", "chart-title")
      .attr("x", width/2)
      .attr("y", margin/2)
      .text("Squirrel Activities");

  });
