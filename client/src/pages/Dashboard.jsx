import React from 'react';
import useAuth from '../auth/useAuth';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const { user } = useAuth();
  // console.log(user.favorites)
  const [favoriteData, setFavoriteData] = React.useState([])
  const [favoriteNumbers, setFavoriteNumbers] = React.useState(user.favorites.map(el => el.siteNumber))



  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'PUT',
          data: {
            siteNumbers: favoriteNumbers,
          },
          url: `http://localhost:5000/report/favoriteReport`,
          withCredentials: true,
        });
        setFavoriteData(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [favoriteNumbers]);

  // console.log(favoriteData)
  let waves = []
  let currentFlows = []

  favoriteData.forEach((data) => {
    console.log(data.observed[data.observed.length - 1].cfs)

    waves.push(<li className={`ml-2`} key={data.date}><NavLink className={'link-accent'} to={`/report/${data.siteNumber}`}>{data.wave}</NavLink></li>)

    currentFlows.push(<li className={`ml-2`} key={data.date}>{data.observed[data.observed.length - 1].cfs} CFS</li>)
  })

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="avatar">
          <div className="w-100 rounded-full">
            <img src="https://placeimg.com/400/400/people" alt='placeholder' />
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">Hi {user.userName[0].toUpperCase() + user.userName.slice(1)}, welcome to your dashboard page.</h1>

          <div className='flex mt-10 justify-start gap-x-1'>
            
            <div className='flex flex-col gap-y-3 pl-3 pr-3'>
              <h2 className='text-2xl font-bold'>Favorite Spot</h2>
              <ul
                className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-6 pr-6 rounded-bl-2xl'
              >
                {waves}
              </ul>
            </div>

            <div className='flex flex-col gap-y-3'>
              <h2 className='text-2xl font-bold'>Current Flows</h2>
              <ul
                className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-8 pr-8'
              >
                {currentFlows}
              </ul>
            </div>

            <div className='flex flex-col gap-y-3 pl-3 pr-3'>
              <h2 className='text-2xl font-bold'>Conditions</h2>
              <ul
                className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-8 pr-8 rounded-br-2xl'
              >
                {currentFlows}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
