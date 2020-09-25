import React from 'react';
import { Link } from "react-router-dom";
import './style/dashboard.css';
import Button from '../button';

export default function Notifications() {
  return (
    <div>
      TURN ON Notifications
      <Button to ="/better-together">
        ALL SET
      </Button>

      <Button to="/better-together">
        SKIP
      </Button>
    </div>
  );
}
