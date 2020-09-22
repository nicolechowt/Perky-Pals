import React from 'react';
import './style/profile-setup.css';

export default function ProfileSetup() {
  return (
    <div>
      <h1>PROFILE SET UP</h1>
      <p>WHY WE SET UP AN ACCOUNT</p>
      
      <form action="">
        <div className="create-account__input-field">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" />
        </div>

        <div className="create-account__input-field">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" />
        </div>

        <div className="create-account__input-field">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" />
        </div>

        <div className="create-account__input-field">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input type="password" name="confirmpassword" />
        </div>
      </form>
    </div>
  );
}
