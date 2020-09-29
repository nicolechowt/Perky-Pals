import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

function AddFruitsAndVeggies(props) {
  const { goBack } = props.history;

  return (
    <div>
      <button onClick={() => goBack()}>GO BACK</button>
      <ActivityForm
        type="FRUITS_AND_VEGGIES"
      />
    </div>
  );
}

export default connect()(AddFruitsAndVeggies);