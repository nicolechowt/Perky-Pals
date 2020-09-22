import React from 'react';
import { Link } from "react-router-dom";
import Button from '../button';
import './style/home.css';

export default function Home() {
  return (
    <div className="home">
      <h2>Tatas</h2>
      <Button>
        <Link to="/create-account">Create Account</Link>
      </Button>

      <Button>
        <Link to="/login">Login</Link>
      </Button>
    </div>
  );
}
