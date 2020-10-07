import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

import './style/add-self-check.css';

function AddSelfCheck(props) {
  const { goBack } = props.history;

  return (
    <div className="add-self-check">
      <ActivityForm 
        onClose={()=> goBack()}
        type="SELF_CHECK"
      />
    </div>
  );
}


export default connect()(AddSelfCheck);