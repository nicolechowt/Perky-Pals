import React, { useState } from "react";
import * as d3 from "d3";
import './style/progress-ring.css';

export default function ProgressRing(props) {
  const { 
    svgWidth, 
    arcWidth, 

    exerciseProgressPercentage, 
    mindfulnessProgressPercentage,
    sleepProgressPercentage,
    waterProgressPercentage,
    fruitsAndVeggiesPercentage,

    selfCheck,
    mammogram,

  } = props;

  const svgHeight = svgWidth;
  const arcOuterRadius = svgWidth / 2;
  const arcInnerRadius = svgWidth / 2 - arcWidth;
  
  {/* exercise ring */}
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

  {/* mindfulness ring */}
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
  
  {/* sleep ring */} 
  const arcGenerator3 = d3
    .arc()
    .innerRadius(arcInnerRadius-40)
    .outerRadius(arcOuterRadius-40)
    .startAngle(0)
    .cornerRadius(5);

  const progressArc3 = value =>
    arcGenerator3({
      endAngle: 2 * Math.PI * value
    });
  
  {/* water ring */}
  const arcGenerator4 = d3
    .arc()
    .innerRadius(arcInnerRadius-60)
    .outerRadius(arcOuterRadius-60)
    .startAngle(0)
    .cornerRadius(5);

  const progressArc4 = value =>
    arcGenerator4({
      endAngle: 2 * Math.PI * value
    });
  
  {/* fruits and veggies ring */}
  const arcGenerator5 = d3
    .arc()
    .innerRadius(arcInnerRadius-80)
    .outerRadius(arcOuterRadius-80)
    .startAngle(0)
    .cornerRadius(5);

  const progressArc5 = value =>
    arcGenerator5({
      endAngle: 2 * Math.PI * value
    });

  {/* self check ring */}
  const arcGenerator6 = d3
    .arc()
    .innerRadius(0)
    .outerRadius(20)
    .startAngle(-(Math.PI)*1)
    .endAngle(Math.PI*0)

  {/* mammogram ring */}
  const arcGenerator7 = d3
    .arc()
    .innerRadius(0)
    .outerRadius(20)
    .startAngle((Math.PI)*1)
    .endAngle(Math.PI*0)

  const exerciseColor = '#f89b54';
  const mindfulnessColor = '#56c4d3';
  const sleepColor = '#3777FF';
  const waterColor = '#F278C3';
  const fruitsAndVeggiesColor = '#ce4257';
  const selfCheckColor = '#FF9B54';
  const mammogramColor = '#56c4d3';

  return (
    <div className="progress-ring">
      <svg height={svgHeight} width={svgWidth}>
        <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>

          {/* exercise ring */}
          <path d={progressArc(1)} opacity="0.1" fill="gray" />

          <path
            d={progressArc(exerciseProgressPercentage / 100)}
            fill= {exerciseColor}
          />

          {/* mindfulness ring */}
          <path d={progressArc2(1)} opacity="0.1" fill="gray" />
          
          <path 
            d={progressArc2(mindfulnessProgressPercentage / 100)} 
            fill={mindfulnessColor}
          />

          {/* sleep ring */}
          <path d={progressArc3(1)} opacity="0.1" fill="gray" />
          
          <path 
            d={progressArc3(sleepProgressPercentage / 100)} 
            fill={sleepColor}
          />

          {/* water ring */}
          <path d={progressArc4(1)} opacity="0.1" fill="gray" />
          
          <path 
            d={progressArc4(waterProgressPercentage / 100)} 
            fill={waterColor}
          />

          {/* fruits and veggies */}
          <path d={progressArc5(1)} opacity="0.1" fill="gray" />
          
          <path 
            d={progressArc5(fruitsAndVeggiesPercentage / 100)} 
            fill={fruitsAndVeggiesColor}
          />

          {/* self check*/}
          
          <path 
            d={arcGenerator6()} 
            opacity={selfCheck? "1" :"0.1"} 
            fill={selfCheck? selfCheckColor : 'gray' }
          />
          
          {/* mammogram */}
          <path 
            d={arcGenerator7()} 
            opacity={mammogram ? "1": "0.1"}
            fill={mammogram? mammogramColor: 'gray'} 
          />
        </g>
      </svg>
    </div>
  );
}
