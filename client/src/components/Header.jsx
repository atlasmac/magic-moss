import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import logo from '../images/default-logo.png'

export default function Header({showLogin, setShowLogin, setShowSignUp, showSignUp}) {
  const { authed, handleLogout } = useAuth();

  const login = () =>{
    setShowLogin(true)
    setShowSignUp(false)
  }
  const signUp = () =>{
    setShowLogin(false)
    setShowSignUp(true)
  }

  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <img src={logo} alt="logo" style={{height:30}}/>
        {/* <NavLink to='/' className="text-lg font-bold">MagicMoss</NavLink> */}
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-start">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">Reports</label>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li><NavLink to='/report/12340500'>Brennan's</NavLink></li>
              <li><NavLink to='/report/12354500'>Zero</NavLink></li>
              <li><NavLink to='/report/13337000'>Lochsa's Pipeline</NavLink></li>
            </ul>
          </div>
          <NavLink to='/' className="btn btn-ghost rounded-btn">Home</NavLink>
          {authed &&
            <NavLink to='/dashboard' className="btn btn-ghost rounded-btn">Dashboard</NavLink>
          }
          {authed && (
            <button type='button' onClick={handleLogout} className="btn btn-ghost rounded-btn">Sign out</button>
          )}
          {!authed && (
            <button type='button' onClick={login} className="btn btn-ghost rounded-btn">Log in</button>
          )}
          {!authed && (
            <button type='button' onClick={signUp} className="btn btn-ghost rounded-btn">Sign up</button>
          )}
        </div>
      </div>
    </div>
  );
}
