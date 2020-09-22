import React from 'react';
import './style/more-info.css';

export default function MoreInfo() {
  const ages = [];
  for(let i=13; i<=100;i++) {
    ages.push(i);
  }

  const ethnicities = ['idk','idk2','idk3','idk4','idk5','idk6'];

  return (
    <div>
      <h1>A LITTLE MORE INFO</h1>
      <p>WHY GIVE THIS INFO</p>
      
      <form action="">
        <label htmlFor="age">Age:</label>
        <select name="age" id="age">
          {ages.map(age => <option id={age} value={age}>{age}</option>)}
        </select>

        <label htmlFor="gender">Gender:</label>
        <select name="gender" id="gender">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="ethnicity">Ethnicity:</label>
        <select name="ethnicity" id="ethnicity">
          {ethnicities.map(ethnicity => <option id={ethnicity} value={ethnicity}>{ethnicity}</option>)}
        </select>

      </form>
    </div>
  );
}
