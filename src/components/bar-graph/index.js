import React, {useEffect} from 'react';
import * as d3 from "d3";

import './style/bar-graph.css';

function BarGraph(props) {
  const { color, data } = props;

  useEffect(()=>{
    if(data.length>0) {
      const width = 300;
      const height = 350;
      
      const margin = ({top: 30, right: 0, bottom: 30, left: 20});
      const xAxisTickNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'];

      const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => xAxisTickNames[i]))
    
      const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(2))
      .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("fill", "currentColor")
        .text(data)
      )    

      const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.3)

      const y = d3.scaleLinear()
      .domain([0, d3.max(data)]).nice()
      .range([height - margin.bottom, margin.top])

      const svg = d3.select("#chart")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", 10);

      svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d))
      .attr("height", d => y(0) - y(d))
      .attr("width", x.bandwidth())
      .attr("fill", color)

      svg.append("g")
      .call(xAxis)
      .selectAll("g")
      .attr('color', (d,i) => {
        if(d===7) {
          return color
        }
      })
      .attr('class', (d,i) => {
        if(d===7) {
          return 'today'
        }
      })

      svg.append("g")
      .call(yAxis);  
    }
  }, [color, data])

  if(!data) return;
  return(
    <div id="chart"></div>
  );
}

export default BarGraph;