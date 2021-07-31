// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 50, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
// var parseTime = d3.timeParse("%d-%b-%y");
var parseTime = d3.timeParse("%Y-%m-%d");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.RecordDate); })
    .y(function(d) { return y(d.ActiveCaseCount); });

var scene1 = d3.select("svg#scene-1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("covid-19-active.js").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.RecordDate = parseTime(d.RecordDate);
      d.ActiveCaseCount = +d.ActiveCaseCount;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.RecordDate; }));
  y.domain([0, d3.max(data, function(d) { return d.ActiveCaseCount; })]);

  // Add the valueline path.
  scene1.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

  // Add the x Axis
  scene1.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

  // Add the y Axis
  scene1.append("g")
        .attr("class", "axisSteelBlue")
        .call(d3.axisLeft(y));

});

var x1 = d3.scaleTime().range([0, width]);
var y1 = d3.scaleLinear().range([height, 0]);
var valueline1 = d3.line()
    .x(function(d) { return x1(d.RecordDate); })
    .y(function(d) { return y1(d.PercentChange); });

          
d3.csv("nifty_50_overall.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.RecordDate = parseTime(d.RecordDate);
      d.PercentChange = +d.PercentChange;
  });

  // Scale the range of the data
  x1.domain(d3.extent(data, function(d) { return d.RecordDate; }));
  y1.domain(d3.extent(data, function(d) { return d.PercentChange; }));

  // Add the valueline path.
  scene1.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", valueline1);

  // Add the y1 Axis
  scene1.append("g")
        .attr("class", "axisRed")
        .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(y1));
  scene1
        .append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y1).tickSize(-width).tickFormat(""));       ;

});