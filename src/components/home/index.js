import React from 'react';
import { withRouter } from "react-router-dom";
import './style/home.css';

function Home(props) {
  const nextPath = (path) => {
    props.history.push(path);
  }

  return (
    <div className="home">
      <h2>Perky Pals</h2>

      <div className="home__perky">
        <div className="home__meetgoals">
          MEET GOALS.
        </div> 
        
        <div className="home__earn">
          EARN COOL STUFF.
        </div>
      </div>


      <button
        className="button--pill-yellow"
        onClick={()=>{nextPath('/dashboard')}}
      >
        Login
      </button>
    </div>
  );
}

export default withRouter(Home);