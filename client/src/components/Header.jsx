import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

export default function Header() {
  const { authed, handleLogout } = useAuth();
  return (
    <header>
      <h2>Mystical Moss River Forecaster</h2>
      <nav className='nav'>
        <NavLink to='/report/12340500'>Brennan's</NavLink>
        <NavLink to='/report/12354500'>Zero</NavLink>
        <NavLink to='/report/13337000'>Lochsa's Pipeline</NavLink>
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
