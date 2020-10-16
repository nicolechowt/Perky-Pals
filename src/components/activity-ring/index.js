import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ActivityRing = props => {
  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value(d => d.totalDuration)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)

  const colors = (i) => {
    const selections = ['#F55F15', '#FF8500', '#FF9900', '#FEBE3E', '#E4AB37', '#ffd900'];

    return selections[i];
  } ;
  const format = d3.format(".2f");

  useEffect(
    () => {
      const data = createPie(props.data);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");

      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      path
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d, i) => {
          if(d.data.activity==='left') {
            return '#efefef';
          }

          return colors(i);
        })
        .attr("stroke-linejoin", "round");

      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));

      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", d => `translate(${createArc.centroid(d)})`)
        .style("fill", "white")
        .style("font-size", 10)
        .text(d => {
          if(d.data.activity!=='left') {
            return d.data.activity;
          }
        });
    },
    [props.data]
  );

  return (
    <svg width={props.width} height={props.height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
    </svg>
  );
};

export default ActivityRing;
