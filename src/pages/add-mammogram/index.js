import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

import './style/add-mammogram.css';

function AddMammogram(props) {
  const { goBack } = props.history;

  return (
    <div className="add-mammogram">
      <ActivityForm 
        onClose={()=> goBack()}
        type="MAMMOGRAM"
      />
    </div>
  );
}

export default connect()(AddMammogram);