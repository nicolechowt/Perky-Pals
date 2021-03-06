import React from 'react';
// import './style/HealthyEatingLibrary.css';

import LibraryIntro from '../../components/library-intro/index'
import LibraryTips from "../../components/library-tips";
import LibraryResources from "../../components/library-resources";

import LibraryDetail from '../../components/library-detail';

import { COLORS } from '../../../../enums/colors';
import ScrollToTop from '../../../scroll-to-top';

export default function HealthyEatingLibrary(props) {
  return (
    <React.Fragment>
      <ScrollToTop />

      <LibraryDetail
        name="HEALTHY EATING"
        color={COLORS.FRUITS_AND_VEGGIES}
        intro={<LibraryIntro name='HEALTHY EATING' />}
        tips={<LibraryTips name='HEALTHY EATING' />}
        resources={<LibraryResources name='HEALTHY EATING' />}
      />
    </React.Fragment>
  );
}
