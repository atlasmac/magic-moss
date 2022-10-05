import React from 'react';
import useAuth from '../auth/useAuth';

function Dashboard() {
  const { user } = useAuth();
  
  let favorites = user.favorites.map((el,i) =>{
    return (
      <p key={`${el}${i}`}>{el}</p>
    )
  })

  return (
    <div className="hero min-h-fit bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className='flex flex-col items-center gap-y-6'>
          <h1 className='text-3xl'>Hi {user.userName}, welcome to your dashboard page.</h1>
          {favorites.length > 0 && <h2 className='text-2xl'>Your favorite waves</h2>}
          {favorites}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
