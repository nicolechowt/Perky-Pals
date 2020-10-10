import React from 'react';
// import './style/MindfulnessLibrary.css';

import LibraryIntro from '../../components/library-intro/index'
import LibraryTips from "../../components/library-tips";
import LibraryResources from "../../components/library-resources";

import LibraryDetail from '../../components/library-detail';

import { COLORS } from '../../../../enums/colors'

export default function MindfulnessLibrary(props) {
  return (
    <LibraryDetail
      name='MINDFULNESS'
      color={COLORS.MINDFULNESS}
      intro={<LibraryIntro name='MINDFULNESS' />}
      tips={<LibraryTips name='MINDFULNESS' />}
      resources={<LibraryResources name='MINDFULNESS' />}
    />
  );
}
