import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import useAuth from '../auth/useAuth';


function Home() {
  const { authed } = useAuth();
  const [signUp, setSignUp] = React.useState(false)

  const signInHandler = () => {
    setSignUp(true)
  }
  return (
    <div>
      <div className='divs'>
        <h2>This is the home page.</h2>
        <div className=''>
          {!authed && <Login />}
          {!authed && !signUp && <div>
            <p>Don't have an account?</p>
            <button onClick={signInHandler}>Sign up</button>
          </div>}

          {signUp && !authed && <SignUp />}
          {authed && 'You are logged in.'}
        </div>
      </div>
    </div>
  );
}

export default Home;
