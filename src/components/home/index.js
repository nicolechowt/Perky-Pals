import React from 'react';
import { withRouter } from "react-router-dom";
import './style/home.css';

function Home(props) {
  const nextPath = (path) => {
    props.history.push(path);
  }

  return (
    <div className="home">
      <div className="home__title">Perky Pals</div>

      <div className="home__perky">
        <div className="home__meetgoals">
          MEET GOALS.
        </div> 
        
        <div className="home__earn">
          EARN COOL STUFF.
        </div>
      </div>


      <button
        className="home__login--bella"
        onClick={()=>{nextPath('/dashboard')}}
      >
        LOGIN AS BELLA
      </button>

      <button
        className="home__login"
        onClick={()=>{nextPath('/dashboard?user=2')}}
      >
        Login as Juliana
      </button>

      <button
        className="home__login"
        onClick={()=>{nextPath('/dashboard?user=3')}}
      >
        Login as Angie
      </button>
    </div>
  );
}

export default withRouter(Home);