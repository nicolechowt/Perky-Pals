import React from 'react';
import './style/better-together.css';
import Button from '../button';

export default function BetterTogether(props) {
  return (
    <div>
      BetterTogether
      <Button to="/dashboard">
        ALL SET
      </Button>

      <Button to="/dashboard">
        SKIP
      </Button>
    </div>
  );
}
