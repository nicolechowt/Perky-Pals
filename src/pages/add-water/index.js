import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

function AddWater(props) {
  const { goBack } = props.history;

  return (
    <div>
      <button onClick={() => goBack()}>GO BACK</button>
      <ActivityForm
        type="WATER"
      />
    </div>
  );
}

export default connect()(AddWater);