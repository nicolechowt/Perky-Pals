import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

import './style/add-sleep.css';

function AddSleep(props) {
  const { goBack } = props.history;

  return (
    <div className="add-sleep">
      <ActivityForm
        onClose={()=> goBack()}
        type="SLEEP"
      />
    </div>
  );
}


export default connect()(AddSleep);