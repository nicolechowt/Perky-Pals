import React from 'react';
import { connect } from 'react-redux';

import './style/activity-box.css';

function Mindfulness(props) {
  const { goBack } = props.history;

  return (
    <div className="activity-box">
      <h1>MINDFULNESS</h1>
      <h2>YOUR WEEK SO FAR</h2>
      <button onClick={() => goBack()}>GO BACK</button>
    </div>
  );
}

export default connect()(Mindfulness);