async function scene1() {
  const json_data = await d3.json("json/covid-19-active.json")
  console.log(json_data)
    
  width = 800
  height = 500
  margin = ({top: 20, right: 30, bottom: 30, left: 40})
  yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

        xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

data = Object.assign(
  json_data
  .map(
    ({RecordDate, ActiveCaseCount}) => 
    ({RecordDate, value: ActiveCaseCount})), {y: "ActiveCaseCount"}
)

x = d3.scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right])

      y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top])

line = d3.line()
         .defined(d => !isNaN(d.value))
         .x(d => x(d.date))
         .y(d => y(d.value))

  const svg = d3.select("#scene-1")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

}

scene1()