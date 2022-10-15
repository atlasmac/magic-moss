import React from 'react';
import { HiMenu } from 'react-icons/hi'
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import logo from '../images/default-logo.png'

export default function Header({ showLogin, setShowLogin, setShowSignUp, showSignUp }) {
  const { authed, handleLogout } = useAuth();

  const login = () => {
    setShowLogin(true)
    setShowSignUp(false)
  }
  const signUp = () => {
    setShowLogin(false)
    setShowSignUp(true)
  }

  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="navbar-start md:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <HiMenu className="h-6 w-6"></HiMenu>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {authed &&
              <li><NavLink to='/dashboard' className="btn btn-ghost rounded-btn">Dashboard</NavLink></li>
            }
            {!authed &&
              <li><Link to='/' onClick={login} className="btn btn-ghost rounded-btn">Log in</Link></li>
            }
            {/* <li><Link to='/' className="btn btn-ghost rounded-btn">Home</Link></li> */}
            <li tabIndex={0}>
              <span className="btn btn-ghost rounded-btn" >Surf Reports</span>
              <ul className="bg-base-100 p-2">
                <li className="menu-title">
                  <span>Montana</span>
                </li>
                <li><NavLink to='/report/12340500'>Brennan's</NavLink></li>
                <li><NavLink to='/report/12354500'>Zero</NavLink></li>
                <li className="menu-title">
                  <span>Idaho</span>
                </li>
                <li><NavLink to='/report/13337000'>Lochsa's Pipeline</NavLink></li>
                <li className="menu-title">
                  <span>Wyoming</span>
                </li>
                <li><NavLink to='/report/13337000'>Lunch Counter</NavLink></li>
              </ul>
            </li>
            <li><NavLink to='/faq' className="btn btn-ghost rounded-btn">FAQ</NavLink></li>
            {authed &&
              <li><button type='button' onClick={handleLogout} className="btn btn-ghost rounded-btn">Sign out</button></li>
            }
          </ul>
        </div>
      </div>
      <div className="flex-1 px-2 lg:flex-none navbar-end md:navbar-start">
        <img src={logo} alt="logo" style={{ height: 30 }} />
        {/* <NavLink to='/' className="text-lg font-bold">MagicMoss</NavLink> */}
      </div>
      <div className="flex justify-end flex-1 px-2 hidden md:flex">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-start">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">Reports</label>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li className="menu-title">
                <span>Montana</span>
              </li>
              <li><NavLink className='' to='/report/12340500'>Brennan's</NavLink></li>
              <li><NavLink to='/report/12354500'>Zero</NavLink></li>
              <li className="menu-title">
                <span>Idaho</span>
              </li>
              <li><NavLink to='/report/13337000'>Lochsa's Pipeline</NavLink></li>
              <li className="menu-title">
                <span>Wyoming</span>
              </li>
              <li><NavLink to='/report/13337000'>Lunch Counter</NavLink></li>
            </ul>
          </div>
          <NavLink to='/' className="btn btn-ghost rounded-btn">FAQ</NavLink>
          {authed &&
            <NavLink to='/dashboard' className="btn btn-ghost rounded-btn">Dashboard</NavLink>
          }
          {authed &&
            <button type='button' onClick={handleLogout} className="btn btn-ghost rounded-btn">Sign out</button>
          }
          {!authed &&
            <Link to='/' onClick={login} className="btn btn-ghost rounded-btn">Log in</Link>
          }
          {!authed &&
            <Link to='/' onClick={signUp} className="btn btn-ghost rounded-btn">Sign up</Link>
          }
        </div>
      </div>
    </div>
  );
}
