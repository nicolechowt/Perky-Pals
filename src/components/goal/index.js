import React from 'react';
import { Link } from "react-router-dom";
import './style/goal.css';
import Button from '../button';

export default function Goal(props) {
  return (
    <div>
      goalsssss
      <Button>
        <Link to="/notifications">DONE</Link>
      </Button>
    </div>
  );
}
