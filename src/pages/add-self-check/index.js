import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

function AddSelfCheck(props) {
  const { goBack } = props.history;

  return (
    <div>
      <button onClick={() => goBack()}>GO BACK</button>
      <ActivityForm 
        onClose={()=> goBack()}
        type="SELF_CHECK"
      />
    </div>
  );
}


export default connect()(AddSelfCheck);