import React from 'react';
// import './style/BreastHealthLibrary.css';

import LibraryIntro from '../../components/library-intro/index'
import LibraryTips from "../../components/library-tips";
import LibraryResources from "../../components/library-resources";

import LibraryDetail from '../../components/library-detail';

import { COLORS } from '../../../../enums/colors'

export default function BreastHealthLibrary(props) {
  return (
    <LibraryDetail
      name="BREAST HEALTH"
      color={COLORS.MAMMOGRAM}
      intro={<LibraryIntro name='BREAST HEALTH' />}
      tips={<LibraryTips name='BREAST HEALTH' />}
      selfcheck={<LibraryTips name='BREAST HEALTH SELF CHECK' />}
      mammogram={<LibraryTips name='BREAST HEALTH MAMMOGRAM' />}
      resources={<LibraryResources name='BREAST HEALTH' />}
    />
  );
}
