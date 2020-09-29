import React, { useState } from "react";
import * as d3 from "d3";
import './style/progress-ring.css';

export default function ProgressRing(props) {
  const { svgWidth, arcWidth, progressPercentage, colorIndicator } = props;
  const svgHeight = svgWidth;
  const arcOuterRadius = svgWidth / 2;
  const arcInnerRadius = svgWidth / 2 - arcWidth;
  
  const arcGenerator = d3
    .arc()
    .innerRadius(arcInnerRadius)
    .outerRadius(arcOuterRadius)
    .startAngle(0)
    .cornerRadius(5);

  const progressArc = value =>
    arcGenerator({
      endAngle: 2 * Math.PI * value
    });

  const arcGenerator2 = d3
    .arc()
    .innerRadius(arcInnerRadius-20)
    .outerRadius(arcOuterRadius-20)
    .startAngle(0)
    .cornerRadius(5);

  const progressArc2 = value =>
    arcGenerator2({
      endAngle: 2 * Math.PI * value
    });
  
  return (
    <div>
      <svg height={svgHeight} width={svgWidth}>
        <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
          <path d={progressArc(1)} opacity="0.1" fill="gray" />

          <path
            d={progressArc(progressPercentage / 100)}
            fill={colorIndicator}
          />

          <path d={progressArc2(1)} opacity="0.1" fill="gray" />
          
          <path 
            d={progressArc2(.4)} 
            fill="#f89b54" 
          />

          {/* <text x="-10" y="5">
            {`${progressPercentage}%`}
          </text> */}
        </g>
      </svg>
    </div>
  );
}
