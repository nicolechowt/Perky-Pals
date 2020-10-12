import React from 'react';
// import './style/ExerciseLibrary.css';

import LibraryIntro from '../../components/library-intro/index'
import LibraryTips from "../../components/library-tips";
import LibraryResources from "../../components/library-resources";

import LibraryDetail from '../../components/library-detail';

import { COLORS } from '../../../../enums/colors';
import ScrollToTop from '../../../scroll-to-top';

export default function ExerciseLibrary(props) {
  return (
    <React.Fragment>
      <ScrollToTop />

      <LibraryDetail
        name='EXERCISE'
        color={COLORS.EXERCISE}
        intro={<LibraryIntro name='EXERCISE' />}
        tips={<LibraryTips name='EXERCISE' />}
        resources={<LibraryResources name='EXERCISE' />}
      />
    </React.Fragment>
  );
}
