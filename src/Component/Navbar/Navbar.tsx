import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <header className='navbar'>
      <nav>
        <ul>
          <li>
            <Link to="/" id="mind-connect" onClick={() => console.log("I am back to the home page")}>
              MindConnect
            </Link>
          </li>
          <hr />
        </ul>
      </nav>
      <Link to="/register" id="sign-up" onClick={() => console.log("This is the registration page")}>
        Sign Up
      </Link>
    </header>
  );
}
