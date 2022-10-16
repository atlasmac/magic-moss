import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import useAuth from '../auth/useAuth';
import background from '../images/DaveGardner_04.png'


function Home({ showLogin, setShowLogin, setShowSignUp, showSignUp }) {
  const { authed } = useAuth();
  const handleClickSign = () => {
    setShowLogin(false)
    setShowSignUp(true)
  }
  const handleClickLog = () => {
    setShowLogin(true)
    setShowSignUp(false)
  }
  console.log(showLogin)
  return (
    <div>
      <div className="hero custom-90vh" style={{ backgroundImage: `url('${background}')` }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-robotoSlab font-bold">Welcome to Magic Moss</h1>
            <p className="mb-5 text-2xl">View current surf reports and forecasted conditions. Share images and interact with your surfing community.</p>
            {!authed && <div className='text-2xl'>
              <button type='button' onClick={handleClickSign} className="btn btn-ghost rounded-btn text-2xl">Sign up</button>
              <span>or</span>
              <button type='button' onClick={handleClickLog} className="btn btn-ghost rounded-btn text-2xl">Login</button>
            </div>}
            <div className='custom-40vh'>
              {!authed && showLogin && <div>
                <Login />
                <div className='flex flex-col items-center gap-y-3 pt-6'>
                  <p>Don't have an account?</p>
                  <button type='button' onClick={handleClickSign} className="btn btn-ghost rounded-btn">Sign up</button>
                </div>
              </div>}
              {!authed && showSignUp && <SignUp />}
              {authed && 'You are logged in.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
