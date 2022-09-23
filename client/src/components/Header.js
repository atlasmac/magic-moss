import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

export default function Header() {
  const { authed, handleLogout } = useAuth();
  return (
    <header>
      <h2>Magic Moss River Forecastor</h2>
      <nav className='nav'>
        <NavLink to='/'>Home</NavLink>
        {authed &&
          <NavLink to='/dashboard'>Dashboard</NavLink>
        }
        {authed && (
          <button type='button' onClick={handleLogout}>
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
}
