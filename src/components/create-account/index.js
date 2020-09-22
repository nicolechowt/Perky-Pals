import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './style/create-account.css';
import ProfileSetup from './component/profile-setup';
import MoreInfo from './component/more-info';
import Button from '../button';

export default function CreateAccount(){
  const [viewState, setViewState] = useState('PROFILE_SET_UP');

  return (
    <div>
      {viewState==='PROFILE_SET_UP' && 
        <div>
          <ProfileSetup />
          {/* ask if continue is good? */}
          <button onClick={()=>setViewState('MORE_INFO')}>NEXT</button>
        </div>
      }

      {viewState==='MORE_INFO' &&
        <div>
          <MoreInfo />
          <Button>
            <Link to="/goals">NEXT</Link>
          </Button>
        </div>
      }
    </div>
  );
}