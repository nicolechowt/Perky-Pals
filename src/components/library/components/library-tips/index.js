import React, { useState } from 'react';
import HelpOverlay from '../../../help-overlay';
import Overlay from '../../../overlay';
import './style/index.css';

const SleepContent = () => {
  return (
    <div className="sleep-content-wrapper">
      <h3 className="sleep-content">10 tips to get more sleep</h3>
      <ol>
        <li>Go to sleep at the same time each night, and get up at the same time each morning, even on the weekends.</li>

        <li>Don't take naps after 3 p.m, and don't nap longer than 20 minutes.</li>

        <li>Stay away from caffeine and alcohol late in the day.</li>

        <li>Avoid nicotine completely.</li>

        <li>Get regular exercise, but not within 2-3 hours of bedtime.</li>

        <li>Don't eat a heavy meal late in the day. A light snack before bedtime is OK.</li>

        <li>Make your bedroom comfortable, dark, quiet, and not too warm or cold.</li>

        <li>Follow a routine to help you relax before sleep (for example, reading or listening to music). Turn off the TV and other screens at least an hour before bedtime.</li>

        <li>Don’t lie in bed awake. If you can’t fall asleep after 20 minutes, do something calming until you feel sleepy, like reading or listening to soft music.</li>

        <li>Talk with a doctor if you continue to have trouble sleeping.</li>
      </ol>

      <p className="source"> Sourced from the <a className="source" href="https://www.cancer.org/latest-news/how-to-get-more-sleep.html#:~:text=Go%20to%20sleep%20at%20the,Avoid%20nicotine%20completely." target="_blank">American Cancer Society</a></p>
    </div>
  );
}

const ExerciseContent = () => {
  return (
    <div className="exercise-content-wrapper">
      <h3 className="exercise-content">Exercise and leisure</h3>
      <p><b>Moderate intensity</b><br />
      Walking, dancing, leisurely bicycling, ice and roller skating, horseback riding, canoeing, yoga</p>

      <p><b>Vigorous intensity</b><br />
      Jogging or running, fast bicycling, circuit weight training, aerobic dance, martial arts, jumping rope, swimming</p>

      <h3 className="exercise-content">Sports</h3>
      <p><b>Moderate intensity</b><br />
      Volleyball, golfing, softball, baseball, badminton, doubles tennis, downhill skiing</p>

      <p><b>Vigorous intensity</b><br />
      Soccer, basketball, field or ice hockey, lacrosse, singles tennis, racquetball, cross-country skiing</p>

      <h3 className="exercise-content">Home activities</h3>
      <p><b>Moderate intensity</b><br />
      Mowing the lawn, general yard and garden maintenance</p>

      <p><b>Vigorous intensity</b><br />
      Digging, carrying and hauling, masonry, carpentry</p>

      <h3 className="exercise-content">Workplace activity</h3>
      <p><b>Moderate intensity</b><br />
      Walking and lifting as part of the job (custodial work, farming, auto or machine repair)</p>

      <p><b>Vigorous intensity</b><br />
      Heavy manual labor (forestry, construction, fire fighting)</p>

      <h3 className="exercise-content">Tips to reduce sitting time</h3>
      <p>Limit time spent watching TV and using other forms of screen-based entertainment.</p>

      <p>Use a stationary bike or treadmill when you do watch TV.</p>

      <p>Use stairs rather than an elevator.</p>

      <p>If you can, walk or bike to your destination.</p>

      <p>Exercise at lunch with your coworkers, family, or friends. </p>
      <p>Take an exercise break at work to stretch or take a quick walk.</p>

      <p>Walk to visit coworkers instead of phoning or sending an e-mail.</p>

      <p>Go dancing with your spouse or friends.</p>

      <p>Plan active vacations rather than only sightseeing trips.</p>

      <p>Wear a pedometer every day and increase your number of daily steps.</p>

      <p>Join a sports team.</p>

      <p className="source">Adapted from the 
        <a className="source" href="https://www.cancer.org/healthy/eat-healthy-get-active/acs-guidelines-nutrition-physical-activity-cancer-prevention/guidelines.html" target="_blank">
          American Cancer Society
        </a>
      </p>
    </div>
  );
}

const MindfulnessContent = () => {
  return(
    <div className="mindfulness-content-wrapper">
      <h3 className="mindfulness-content">It’s more than ooommmm</h3>
      <p><b>Mindfulness doesn’t have to mean sitting on the floor and meditating.</b></p> 

      <p>You can add moments of mindfulness while you’re walking, eating, or even talking with a friend. <b>Take a moment on your next walk and listen to the sounds around you.</b> What do you hear? Birds, cars, laughter? Take a deep breath. What do you smell? Freshly cut grass, flowers, the trees?</p>

      <p><b>When you take a bite of your favorite food, pause and savour that bite.</b> Can you taste or smell all of the ingredients that went into that dish?</p>

      <p><b>When talking with a friend, put your phone completely away and make eye contact.</b> Put your full energy into the conversation. </p>

      <p>Find these small moments to be really present.</p>
    </div>
  );
}

const BreastHealthSelfCheckContent = () => {
  return(
    <div className="breasthealth-self-check-content-wrapper">
      <h3 className="breasthealth-sc-content">Know your boobies</h3>
      <p>The best way to know your boobs is by routining taking the time to perform a self exam.</p> 

      <h3 className="breasthealth-sc-content">Let’s do it</h3>
      <p><b>Step 1</b><br /> 
      Begin by looking at your breasts in the mirror with your shoulders straight and your arms on your hips.</p>

      <p>Here's what you should look for:</p>
      <ul>
        <li>Breasts that are their usual size, shape, and color</li>
        <li>Breasts that are evenly shaped without visible distortion or swelling</li>
      </ul>

      <p>If you see any of the following changes, bring them to your doctor's attention:</p>
      <ul>	
        <li>Dimpling, puckering, or bulging of the skin</li>
        <li>A nipple that has changed position or an inverted nipple (pushed inward instead of sticking out)</li>
        <li>Redness, soreness, rash, or swelling</li>
      </ul>

      <p><b>Step 2</b><br />
      Now, raise your arms and look for the same changes.</p>

      <p><b>Step 3</b><br />
      While you're at the mirror, look for any signs of fluid coming out of one or both nipples (this could be a watery, milky, or yellow fluid or blood).</p>

      <p><b>Step 4</b><br />
      Next, feel your breasts while lying down.</p>

      <p>Use your right hand to feel your left breast and then your left hand to feel your right breast.</p> 

      <p>Use a firm, smooth touch with the first few finger pads of your hand, keeping the fingers flat and together. Use a circular motion, about the size of a quarter.</p>

      <p>Cover the entire breast from top to bottom, side to side — from your collarbone to the top of your abdomen, and from your armpit to your cleavage.</p>

      <p><b>Follow a pattern to be sure that you cover the whole breast.</b> </p>

      <p>You can begin at the nipple, moving in larger and larger circles until you reach the outer edge of the breast. </p>

      <p>You can also move your fingers up and down vertically, in rows, as if you were mowing a lawn. This up-and-down approach seems to work best for most women. </p>

      <p>Be sure to feel all the tissue from the front to the back of your breasts: for the skin and tissue just beneath, use light pressure; use medium pressure for tissue in the middle of your breasts; use firm pressure for the deep tissue in the back. When you've reached the deep tissue, you should be able to feel down to your ribcage.</p>

      <p><b>Step 5</b><br />
      Finally, feel your breasts while you are standing or sitting. </p>

      <p>Many women find that the easiest way to feel their breasts is when their skin is wet and slippery, so they like to do this step in the shower. </p>

      <p>Cover your entire breast, using the same hand movements described in step 4.</p>

      <p><b>Finally, describe your boobs</b><br/>
      Use the notes section to jot down anything you’d like to remember later. This could be how your breasts feel or what worked best for performing the check. Note where your feel lumps or irregularities. It is not usual for for lumps to appear at certain times of the month, but then disappear, as your body changes with the menstrual cycle (if you are still menstruating).</p>

      <h3 className="breasthealth-sc-content">What to do if you feel a lump</h3>

      <p><b>Don’t panic.</b></p>
      
      <p>Most women have some lumps or lumpy areas in their breasts all the time, and most breast lumps turn out to be benign (not cancer). There are a number of possible causes of non-cancerous breast lumps, including normal hormonal changes, a benign breast condition, or an injury.</p>

      <p><b>Don’t hesitate to call your doctor if you’ve noticed a lump or other breast change that is new and worrisome. </b></p>

      <p>This is especially true for changes that last more than one full menstrual cycle or seem to get bigger or more prominent in some way. If you menstruate, you may want to wait until after your period to see if the lump or other breast change disappears on its own before calling your doctor. The best healthcare provider to call would be one who knows you and has done a breast exam on you before — for example, your gynecologist, primary care doctor, or a nurse practitioner who works with your gynecologist or primary care doctor.</p>

      <p className="source">Adapted from <a className="source" href="https://www.breastcancer.org/symptoms/testing/types/self_exam" target="_blank">breastcancer.org.</a></p>

    </div>
  );
}


const HealthyEatingContent = () => {
  return(
    <div className="healthy-eating-content-wrapper">
      <p><b>Here are some tips to work more fruits, veggies, and water into your everday life.</b></p>
      <img src="https://res.cloudinary.com/dbnasq0ef/image/upload/v1602649875/DrinkWater_h94l9v.png" />
      <img src="https://res.cloudinary.com/dbnasq0ef/image/upload/v1602649877/ImmuneFoods_exnfe0.png" />
      <img src="https://res.cloudinary.com/dbnasq0ef/image/upload/v1602649872/HealthySnacks_ulyr6k.png" />
    </div>
  );
}

function LibraryTips(props){
  const [overlayView, setOverlayView] = useState(null);

  const BreastHealthMammogramContent = () => {
    return(
      <div className="breasthealth-mammogram-content-wrapper">
        <h3 className="breasthealth-mam-content">When’s the right time to get a mammogram?</h3>
        <p>No matter your age, the most important time to seek medical care is when you notice a change in your breasts. Don’t wait! Talk to your health care provider right away.</p>
  
        <h3 className="breasthealth-mam-content">What to expect at your appointment</h3>
        <p>If you’ve never had a mammogram before, knowing what to expect can smooth the process and ease anxiety.</p>
  
        <p>Here are some things it’s good to know beforehand.</p>
  
        <p>If you have a regular cycle, you may want to <b>schedule your appointment in the week after an upcoming period.</b> Your breasts should be less tender at that time.</p>
  
        <p>If you’ve had a mammogram before and are going to a new center, it’s best to arrange to <b>transfer previous results before your appointment or bring them with you</b> when you go to your exam. You’ll have to sign a release to get the results, which may be shared by film, CD or electronically. Some centers have nurse navigators who can help you with the transfer.</p>
  
        <p><b>It’s a good idea to keep a record of every mammogram for future reference.</b> Make sure to note the name and address of the center and the date you had the mammogram done. (You can do that here in this app!)</p>
  
        <p>The mammography center will likely ask you for the name of your doctor so they can share your results in case any follow-up is recommended.</p>
  
        <p>You can expect a screening mammogram to take about <b>15 minutes</b>.</p>
  
        <p>To get the mammogram you’ll need to <b>undress from the waist up</b>, so it’s a good idea to wear a shirt you can remove easily.</p>
  
        <p><b>Avoid using deodorants, antiperspirants, perfumes, powders or lotions on your breasts and underarm areas</b> on the day of the exam. Ingredients in these products can show up on a mammogram and make it harder to read. (If you forget and wear one of these products, many mammography centers will give you wipes so you can remove it before the test.)</p>
  
        <p>During the exam, <b>each breast is pressed between two plates</b> and an X-ray image is made. Two views of each breast are taken, one from top to bottom and the other from side to side.</p>
  
        <p><b>Sometimes, the pressure from the plates can be uncomfortable, but it only lasts for a few seconds.</b> If you have concerns, talk with your doctor about taking acetaminophen (eg. Tylenol) or ibuprofen (eg. Advil, Motrin) about an hour before the exam. You can also talk to the technologist before your exam if you’re worried about pain. The technologist can work with you to make you as comfortable as possible while still getting a good quality image.</p>
  
        <p className="source">Adapted from <a className="source" href="https://knowyourgirls.org/resources/mammogram-faqs/" target="_blank">Know Your Girls</a></p>
      
        <h3 className="breasthealth-mam-content">Get an inside look</h3>
        <p>
          The CDC recommends the average woman start a yearly mammogram routine at age 40. This age can vary based on ethnicity and family history. Talk with your health care provider to figure our your best routine. Don’t have a health care provider? Get connected 
            <span 
              onClick={()=>setOverlayView('HELP')}
              className="breasthealth-mam-content"
            > here</span>.
          </p>
      </div>
    );
  }

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

        if(props.name==='HEALTHY EATING'){
          return (
            <HealthyEatingContent />
          )
        }

        if(props.name==='MINDFULNESS'){
          return (
            <MindfulnessContent />
          )
        }

        if(props.name==='BREAST HEALTH SELF CHECK'){
          return (
            <BreastHealthSelfCheckContent/>
          )
        }

        if(props.name==='BREAST HEALTH MAMMOGRAM'){
          return (
            <BreastHealthMammogramContent />
          )
        }
      })()}

      {overlayView=== 'HELP' && (
        <Overlay onClose={()=>setOverlayView(null)}>
          <HelpOverlay />
        </Overlay>
      )}   
    </div>
  );
}

export default(LibraryTips)