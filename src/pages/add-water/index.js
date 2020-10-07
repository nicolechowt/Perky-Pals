import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

import './style/add-water.css';

function AddWater(props) {
  const { goBack } = props.history;

  return (
    <div className="add-water">
      <ActivityForm
        onClose={()=> goBack()}
        type="WATER"
      />
    </div>
  );
}

export default connect()(AddWater);