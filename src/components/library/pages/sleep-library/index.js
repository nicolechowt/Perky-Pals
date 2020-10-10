import React from 'react';
// import './style/SleepLibrary.css';

import LibraryIntro from '../../components/library-intro/index'
import LibraryTips from "../../components/library-tips";
import LibraryResources from "../../components/library-resources";

import LibraryDetail from '../../components/library-detail';

import { COLORS } from '../../../../enums/colors'

export default function SleepLibrary(props) {
  return (
    <LibraryDetail
      name="SLEEP"
      color={COLORS.SLEEP}
      intro={<LibraryIntro name='SLEEP' />}
      tips={<LibraryTips name='SLEEP' />}
      resources={<LibraryResources name="SLEEP" />}
    />
  );
}
