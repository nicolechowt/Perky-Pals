import React, { useState } from 'react';

import './style/index.css';

const SleepContent = () => {
  return (
    <div className="sleep-content-wrapper">
      <h3 className="sleep-content">But wait, there’s more!</h3>

      <p><a href="https://www.sleepfoundation.org/articles/healthy-sleep-tips" target="_blank" className="sleep-content">SleepFoundation.org</a> has lots of ideas to help get you prepare and set the mood for some ZZZs.</p>

      <p>The <a href="http://mayoclinic.org/healthy-lifestyle/adult-health/in-depth/sleep/art-20048379" target="_blank" className="sleep-content">Mayo Clinic</a> also has some adivice.</p>
    </div>
  );
}

const ExerciseContent = () => {
  return(
    <div className="exercise-content-wrapper">
      <h3 className="exercise-content">But wait, there’s more!</h3>

      <p>The American Cancer Society has lots of information on how our activity can affect our health:</p>
      <ul>
        <li><a href="https://www.cancer.org/healthy/eat-healthy-get-active/acs-guidelines-nutrition-physical-activity-cancer-prevention/guidelines.html" target="_blank" className="exercise-content">Daily/weekly recommendations</a></li> 
        <li><a href="https://www.cancer.org/healthy/eat-healthy-get-active/acs-guidelines-nutrition-physical-activity-cancer-prevention/diet-and-activity.html" target="_blank" className="exercise-content">Effects of diet and physical activity</a></li>
      </ul>

      <p>The <a href="https://www.nhs.uk/live-well/exercise/gym-free-exercises/" target="_blank" className="exercise-content">National Health Service</a> has wonderful resources for free exercise ideas – Couch to 5K, home cardio, 10-minute tummy toning, and more!</p>
    </div>
  );
}

const MindfulnessContent = () => {
  return(
    <div className="mindfulness-content-wrapper">
      <h3 className="mindfulness-content">But wait, there’s more!</h3>

      <p>Interested in trying out meditation? Here are some apps to help you get started:</p>
      <ul>
        <li><a href="https://www.headspace.com/" target="_blank" className="mindfulness-content">Headspace</a></li>
        <li><a href="https://insighttimer.com/" target="_blank" className="mindfulness-content">InsightTimer</a></li>
        <li><a href="https://www.tenpercent.com/" target="_blank" className="mindfulness-content">Ten Percent Happier</a></li>
      </ul>

      <p>Interested in learning more about mindfulness? <a href="https://open.spotify.com/episode/3sk6nfbFP3GGTgzuXgsd3n?si=hUsKVySZTCelMsI1WtZieQ" target="_blank" className="mindfulness-content">This episode</a> of the Ten Percent Happier podcast talks about the four ways to establish mindfulness that “the Buddha was said to have laid out.”</p>
   </div>
  );
}

const HealthyEatingContent = () => {
  return(
    <div className="healthy-eating-content-wrapper">
      <h3 className="healthy-content">But wait, there’s more!</h3>

      <p>Check out the <a href="https://www.cancer.org/healthy/eat-healthy-get-active.html" target="_blank" className="heathy">American Cancer Society’s</a> website for more information on healthy eating. </p>
      <p><a href="https://www.cancer.org/healthy/eat-healthy-get-active/acs-guidelines-nutrition-physical-activity-cancer-prevention/guidelines.html" target="_blank" className="healthy-content">This section</a> shows how what we eat affects our cancer risk.</p>

      <p>The USDA has lots of tips for eating healthy.</p>
      <ul>
        <li>explore by <a href="https://choosemyplate-prod.azureedge.net/" target="_blank" className="healthy-content">food group</a></li>
        <li>tips for shopping for food on a <a href="https://www.choosemyplate.gov/ten-tips-smart-shopping" target="_blank" className="heathy">budget</a></li>
        <li>budget friendly <a href="https://www.choosemyplate.gov/myplatekitchen/recipes" target="_blank" className="healthy-content">recipe ideas</a></li>
      </ul>
    </div>
  );
}

const BreastHealthContent = () => {
  return(
    <div className="breasthealth-content-wrapper">
      <h3 className="breasthealth-content">But wait, there’s more!</h3>

      <p>Check out the <a href="https://www.cancer.org/" target="_blank" className="breasthealth-content">American Cancer Society</a>’s website for <a href="https://www.cancer.org/cancer/breast-cancer/screening-tests-and-early-detection/mammograms/mammogram-basics.html" target="_blank" className="breasthealth-content">basic info</a> on mammograms. Learn about the <a href="https://www.cancer.org/cancer/breast-cancer/screening-tests-and-early-detection/mammograms/mammograms-what-to-know-before-you-go.html" target="_blank" className="breasthealth-content">screening process</a> – preparing for a mammogram, what do tell your techologist, and what to expect from during your screening – and about understanding your <a href="https://www.cancer.org/cancer/breast-cancer/screening-tests-and-early-detection/mammograms/understanding-your-mammogram-report.html" target="_blank" className="breasthealth-content">results</a>.</p>

      <p> <a href="https://knowyourgirls.org/" target="_blank" className="breasthealth-content">Know your Girls</a> is a great resource for more information on all things breast health. Check out <a href="https://knowyourgirls.org/resources/7-tips-for-being-your-own-best-advocate/" target="_blank" className="breasthealth-content">How to Be Your Own Best Advocate</a>.</p>

      <p>BreastCancer.org has a more detailed description for performing a <a href="https://www.breastcancer.org/symptoms/testing/types/self_exam" target="_blank" className="breasthealth-content">self exam</a>.</p>

      <p>Need free or low-cost screenings? Get help from the <a href="https://www.cdc.gov/cancer/nbccedp/screenings.htm" target="_blank" className="breasthealth-content">CDC</a>.</p>

      <h3 className="breasthealth-content">Feeling generous?</h3>
      <p>
        <i>If you have a few bucks to spare...</i><br />
        <b>American Cancer Society</b> invites you to <a href="https://secure.acsevents.org/site/SPageServer/?pagename=strides_msabc" target="_blank" className="breasthealth-content">Join the Movement, Fund the Future</a>
      </p>

      <p>
        <i>If you have some time to spare...</i><br />
        These <b>research and clinical trials</b> are looking for volunteers. One way to improve cancer detection, prevention, and treatment is through research. People participating in research contribute to medical knowledge and have opportunity to receive cutting-edge care.
      </p>
      <p><a href="https://www.facingourrisk.org/research-clinical-trials/featured" target="_blank" className="breasthealth-content">Find out more at here.</a></p>

      <h3 className="breasthealth-content">The latest news in Breast Health</h3>
      <a href="https://www.sciencedaily.com/releases/2020/01/200115090957.htm" target="_blank">
        <img src="https://res.cloudinary.com/dbnasq0ef/image/upload/v1602872687/omar-lopez-auEe5lKHZCw-unsplash_fhgplq.jpg" style={{maxWidth: '100%', borderRadius: '9px'}} />

        <p>
          <div style={{padding: '10px 0'}}>
            <b>DNA Damage to Breast Cells from Chemicals in Some Cosmetics, Sunscreens</b><br />
          </div>
          Oct. 15, 2020 — A new approach to studying the effects of two common chemicals used in cosmetics and sunscreens found they can cause DNA damage in breast cells at surprisingly low concentrations, while the same dose ...
        </p>
      </a>
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