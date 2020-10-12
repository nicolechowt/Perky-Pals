import React from 'react';
// import './style/MindfulnessLibrary.css';

import LibraryIntro from '../../components/library-intro/index'
import LibraryTips from "../../components/library-tips";
import LibraryResources from "../../components/library-resources";

import LibraryDetail from '../../components/library-detail';

import { COLORS } from '../../../../enums/colors';
import ScrollToTop from '../../../scroll-to-top';

export default function MindfulnessLibrary(props) {
  return (
    <React.Fragment>
      <ScrollToTop />

      <LibraryDetail
        name='MINDFULNESS'
        color={COLORS.MINDFULNESS}
        intro={<LibraryIntro name='MINDFULNESS' />}
        tips={<LibraryTips name='MINDFULNESS' />}
        resources={<LibraryResources name='MINDFULNESS' />}
      />
    </React.Fragment>
  );
}
