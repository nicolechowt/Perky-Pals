import React from 'react';
import { Link } from "react-router-dom";
import './style/dashboard.css';
import Button from '../button';

export default function Notifications() {
  return (
    <div>
      TURN ON Notifications
      <Button>
        <Link to="/better-together">
          ALL SET
        </Link> 
      </Button>

      <Button>
        <Link to="/better-together">
          SKIP
        </Link> 
      </Button>
    </div>
  );
}
