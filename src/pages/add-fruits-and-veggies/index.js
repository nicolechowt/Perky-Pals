import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

import './style/add-fruits-and-veggies.css';

function AddFruitsAndVeggies(props) {
  const { goBack } = props.history;

  return (
    <div className="add-fruits-and-veggies">
      <ActivityForm
        onClose={()=> goBack()}
        type="FRUITS_AND_VEGGIES"
      />
    </div>
  );
}

export default connect()(AddFruitsAndVeggies);