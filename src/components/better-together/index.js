import React from 'react';
import { Link } from "react-router-dom";
import './style/better-together.css';
import Button from '../button';

export default function BetterTogether(props) {
  return (
    <div>
      BetterTogether
      <Button>
        <Link to="/dashboard">
          ALL SET
        </Link> 
      </Button>

      <Button>
        <Link to="/dashboard">
          SKIP
        </Link> 
      </Button>
    </div>
  );
}
