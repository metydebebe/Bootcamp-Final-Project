import React from 'react';
import { NavLink } from 'react-router-dom';

// Navigation Component
const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning rounded-4">
      <div className="container">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/petProfiles">Pet Profiles</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/events">Events</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/apply">Apply Now</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;