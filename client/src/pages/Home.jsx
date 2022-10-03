import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import useAuth from '../auth/useAuth';


function Home({ showLogin, setShowLogin, setShowSignUp, showSignUp }) {
  const { authed } = useAuth();
  const handleClick = () => {
    setShowLogin(false)
    setShowSignUp(true)
  }
  console.log(showLogin)
  return (
    <div>
      <div>
        {showLogin && <Login />}
        {showLogin &&
          <div className='flex flex-col items-center gap-y-3 pt-6'>
            <p>Don't have an account?</p>
            <button type='button' onClick={handleClick} className="btn btn-ghost rounded-btn">Sign up</button>
          </div>
        }

        {showSignUp && <SignUp />}
        {showSignUp && <div className='flex flex-col items-center gap-y-3 pt-6'>
          <button type='button' onClick={handleClick} className="btn btn-ghost rounded-btn">Log in</button>
        </div>}
        {authed && 'You are logged in.'}
      </div>
    </div>
  );
}

export default Home;
