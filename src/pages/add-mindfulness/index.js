import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

import './style/add-mindfulness.css';

function AddMindfulness(props) {
  const { goBack } = props.history;

  return (
    <div className="add-mindfulness">
      <ActivityForm 
        onClose={()=> goBack()}
        type="MINDFULNESS"
      />
    </div>
  );
}


export default connect()(AddMindfulness);