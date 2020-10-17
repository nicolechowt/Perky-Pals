# Perky Pals
<strong>Perky pals</strong> is a submission for the Girls In Tech hackathon in Fall 2020.

Perky pals is a wellness tracker that continuously motivates you to create and build healthy habits to reduce your overall risks of breast cancer.  We remove barriers to resources by allowing our users to earn points for healthy food, time-saving meals, and pro-bono medical care for reaching their goals. 

Our colors are vibrant to convey energy and positivity. The font is strong and curvy to reflect the women who use Perky Pals. We write in a voice that is casual and upbeat to connect with women in a positive way.

## User Journeys
We organized the results of our analysis into 3 personas and catered the app to solve the pains for these personas.

<strong>Bella</strong> - a new user to the app. She is young, busy and is working multiple jobs to make ends meet. She doesn't feel like she has any extra time in her day to work out.  Her friend Juliana told her about Perky Pals.

She comes to the app for tips and and resources to stay motivated with her workouts. She is also intrigued by the rewards like the time-saving meal kits.

Since she is still in her 20s, she has never thought about breast health in any capacity. 

---

<strong>Juliana</strong>  - our super user, and Bella's good friend. Her family has a history of breast cancer and she is looking for reducing her risk.  Champion for organizing events - Juliana has been earning points for eating well, exercising, performing her self-checks and scheduling a mammogram. Although she is not in need of the resources herself, she has decided to save her points for a community farm stand with a mobile mammogram for an underserved community near her.

---

<strong>Angie</strong>  - joined Perky Pals because she needed an app to motivate her to workout. With all the recent events in her personal and work life, she has also been feeling anxious and having trouble with sleep. She's been wanting to see a therapist for her anxiety but does not have the funds to do so.

At 45 years young, she's aware that she should be getting a mammogram soon. However, she has no idea where to start. Not to mention, she's reluctant to proactively seek information because she's afraid of the pain and cost involved.

## Snippets of app flow

We have included a few flows of our app to give you a sense of how our users might experience Perky Pals.

### Dashboard view
Using the goals set by the individual user (goal setting feautre is not yet implemented), we provide users a graphical view of their progress. 

![](/src/assets/dashboard.gif)

### Log an activity
To encourage users to keep up their streak, we provide a detailed view of how they're doing - with rewards enticing them to keep going below.

![](/src/assets/loggingExercise.gif)


### Friend view
Accountable is key. We have a friend view to allow users to see how their friend is doing with regards to their goals.

![](/src/assets/friend.gif)


### Self Check
We provide the option for users to keep a log of their monthly self checks. We encourage them to join the movement by sharing a selfie to raise awareness.

![](/src/assets/selfCheck.gif)


### Mammogram - Past
We allow users to record a mammogram that occured in the past so that we can remind them of the next one.

We update our customized tip once a goal has been completed.

![](/src/assets/mammogramPast.gif)

### Mammogram - Future
We also let users to record a mammogram that is scheduled in the future so that we can send them a reminder prior. 

We realize many of our users may be nervous about the process, so we update the customized tip accordingly to sooth their nerves. 

![](/src/assets/mammogramFuture.gif)


### Help
We envision there to be a help feature to expose available funds and no/low cost breast-related resources to our users.

Here's Angie finding a mammogram provider near her.

![](/src/assets/help.gif)


### Redeem
A big part of our app is to remove barriers to resources for our users. By reaching their goals, our users can earn points for healthy food, time-saving meals, and pro-bono medical care.

![](/src/assets/redeem.gif)


### Library
Our library view contains tips and resources to encourage users to live a healthier lifestyle.

![](/src/assets/library.gif)


## Live Demo
Want to play around with the app?

Based on the user journeys above, we have loaded hardcoded data onto each profile to help you visualize their experience.

- Bella - https://amazing-stonebraker-19f8f7.netlify.app/


- Jualiana - https://amazing-stonebraker-19f8f7.netlify.app/dashboard?user=2


- Angie - https://amazing-stonebraker-19f8f7.netlify.app/dashboard?user=3


> Note: 
For the app to load properly, please enter through one of the entry points via the links provided above.

## Progressive Web App
Although we couldn't implement all the features of a PWA, the app was designed with a mobile-first experience. For the best viewing experience, we recommend you to do the following,

### iPhone/iPad -

Visit the website using mobile safari
Tap the Share button (at the browser options)
From the options tap the Add to Home Screen option, you will see the icon of of the site added to your device’s homes creen instantly.

### Android -

On your Android device, open Chrome .
Go to a website you want to install.
Tap Add to home screen.
Follow the onscreen instructions to install.

### Chrome Browser -

On your computer, open Chrome.
Go to a website you want to install.
At the top right of the address bar, click Install “+”
Follow the onscreen instructions to install the PWA.

### To run app locally,
App was built with reactjs, and can be run locally using `npm start`
