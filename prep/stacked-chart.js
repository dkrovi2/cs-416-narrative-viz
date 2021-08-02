async function renderScene3() {
  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 200, bottom: 100, left: 90 },
    width = 960 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

  var parseTime = d3.timeParse("%Y-%m-%d");
  var svg = d3.select("#scene-3")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  var csvFile = "data/nifty-industry-perf-pivot.csv"
  // var csvData = await d3.csv(csvFile)
  d3.csv(csvFile).then(function (data) {
    data.forEach(function (d) {
      d.RecordDate = parseTime(d.RecordDate);
    });

    // List of groups = header of the csv files
    const keys = ["AUTOMOBILE", "CEMENT_CEMENT_PRODUCTS", "CONSTRUCTION", "CONSUMER_GOODS", "FERTILISERS_PESTICIDES", "FINANCIAL_SERVICES", "INFOTECH", "MEDIA_ENTERTAINMENT_PUBLICATION", "METALS", "OIL_GAS", "PHARMA", "POWER", "SERVICES", "TELECOM"]
    // color palette
    const color = d3.scaleOrdinal().domain(keys).range(d3.schemeSet2);
    const stackedData = d3.stack().keys(keys)(data)

    console.log(data)

    // Add X axis
    const x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.RecordDate; }))
      .range([0, width]);
    const xAxis = svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x)
        .ticks(d3.timeDay.filter(d => d3.timeDay.count(0, d) % 30 === 0))
        .tickFormat(d3.timeFormat("%b %Y")))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // Add X axis label:
    svg.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 50) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    // Add Y axis label:
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Price Movement");

    // Add Y axis
    const y = d3.scaleLinear().domain([100, 400000]).range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y).ticks(15))

    // Add a clipPath: everything out of this area won't be drawn.
    const clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);
    const areaChart = svg.append('g').attr("clip-path", "url(#clip)")

    // Area generator
    const area = d3.area()
      .x(function (d) { return x(d.data.RecordDate); })
      .y0(function (d) { return y(d[0]); })
      .y1(function (d) { return y(d[1]); })

    // Show the areas
    areaChart
      .selectAll("mylayers")
      .data(stackedData)
      .join("path")
      .attr("class", function (d) { return "myArea " + d.key })
      .style("fill", function (d) { return color(d.key); })
      .attr("d", area)

    let idleTimeout
    function idled() { idleTimeout = null; }

    const highlight = function (event, d) {
      d3.selectAll(".myArea").style("opacity", .05)
      d3.select("." + d).style("opacity", 2)
    }

    const noHighlight = function (event, d) {
      d3.selectAll(".myArea").style("opacity", 1)
    }

    // Add one dot in the legend for each name.
    const size = 15
    const legendX = 670
    svg.selectAll("myrect")
      .data(keys)
      .join("rect")
      .attr("x", legendX)
      .attr("y", function (d, i) { return 10 + i * (size + 5) })
      .attr("width", size)
      .attr("height", size)
      .style("fill", function (d) { return color(d) })
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(keys)
      .join("text")
      .attr("x", legendX + size * 1.2)
      .attr("y", function (d, i) { return 10 + i * (size + 5) + (size / 2) })
      .style("fill", function (d) { return color(d) })
      .text(function (d) { return d })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      .style("font-size", "50%")
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)

  })
}