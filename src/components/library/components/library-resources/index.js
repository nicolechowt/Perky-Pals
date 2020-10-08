import React, { useState } from 'react';

// import './style/index.css';

const SleepContent = () => {
  return (
    <div>
      But wait, there’s more!

      SleepFoundation.org has lots of ideas to help get you prepare and set the mood for some ZZZs.

      The Mayo Clinic also has some adivice. 
    </div>
  );
}

const ExerciseContent = () => {
  return(
    <div>
      But wait, there’s more!

      The American Cancer Society has lots of information on how our activity can affect our health:
      • Daily/weekly recommendations 
      • Effects of diet and physical activity

      The National Health Service has wonderful resources for free exercise ideas – Couch to 5K, home cardio, 10-minute tummy toning, and more!
    </div>
  );
}

const MindfulnessContent = () => {
  return(
    <div>
      But wait, there’s more!

      Interested in trying out meditation? Here are some apps to help you get started:
      • Headspace
      • InsightTimer
      • Ten Percent Happier

      Interested in learning more about mindfulness? This episode of the Ten Percent Happier podcast talks about the four ways to establish mindfulness that “the Buddha was said to have laid out”.
    </div>
  );
}

const HealthyEatingContent = () => {
  return(
    <div>
      But wait, there’s more!

      Check out the American Cancer Society’s website for more information on healthy eating. This section shows how what we eat affects our cancer risk.

      The USDA has lots of tips for eating healthy.
      • explore by food group
      • tips for shopping for food on a budget
      • budget friendly recipe ideas
    </div>
  );
}

const BreastHealthContent = () => {
  return(
    <div>
      But wait, there’s more!

      Check out the American Cancer Society’s website for basic info on mammograms. Learn about the screening process – preparing for a mammogram, what do tell your techologist, and what to expect from during your screening – and about understanding your results.

      Know your Girls is a great resource for more information on all things breast health. Check out How to Be Your Own Best Advocate.

      BreastCancer.org has a more detailed description for performing a self exam.

      Need free or low-cost screenings? Get help from the CDC.
    </div>
  );
}

function LibraryResources(props){
  return(
    <div>
      {(()=> {
        if(props.name==='SLEEP'){
          return(
            <div>
              <SleepContent />
            </div>
          );  
        } 
      
        if(props.name==='EXERCISE'){
          return (
            <ExerciseContent />
          )
        }

        if(props.name==='MINDFULNESS'){
          return (
            <MindfulnessContent />
          )
        }

        if(props.name==='HEALTHY EATING'){
          return (
            <HealthyEatingContent />
          )
        }

        if(props.name==='BREAST HEALTH'){
          return (
            <BreastHealthContent />
          )
        }
      })()}
    </div>
  )
}

export default(LibraryResources)