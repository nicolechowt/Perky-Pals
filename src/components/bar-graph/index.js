import React, {useEffect} from 'react';
import * as d3 from "d3";

function BarGraph(props) {
  const { color, data, divideByTen } = props;

  useEffect(()=>{
    if(data.length>0) {
      const w = 400;
      const h = 300;
      
      const svg = d3.select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin-left", 10);
                    
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 40)
        .attr("y", (d, i) => {
          if(!divideByTen){
            return h - 10 * d
          }
          return h-3*d;
        })
        .attr("width", 25)
        .attr("height", (d, i) => {
          if(!divideByTen) {
            return d * 10;
          } 
          return d*5;
        })
        .attr("fill", color)
  
        svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("x", (d, i) => i * 40)
        .attr("y", (d, i) => h - (10 * d) - 3);
    }

  }, [color, data])

  if(!data) return;
  return(
    <div id="chart"></div>
  );
}

export default BarGraph;