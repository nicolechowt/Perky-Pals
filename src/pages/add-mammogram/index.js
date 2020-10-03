import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

function AddMammogram(props) {
  const { goBack } = props.history;

  return (
    <div>
      <button onClick={() => goBack()}>GO BACK</button>
      <ActivityForm 
        onClose={()=> goBack()}
        type="MAMMOGRAM"
      />
    </div>
  );
}


export default connect()(AddMammogram);