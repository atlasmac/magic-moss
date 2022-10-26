import React, { useState } from 'react'
import useAuth from '../auth/useAuth';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import useConditionHook from '../hooks/useConditionHook';

const DashboardTable = () => {
  const { user } = useAuth();
  const [favoriteData, setFavoriteData] = useState([]);
  const [favoriteNumbers, setFavoriteNumbers] = useState(user.favorites.map(el => el.siteNumber));
  const { getConditions } = useConditionHook();

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'PUT',
          data: {
            siteNumbers: favoriteNumbers,
          },
          url: `${process.env.REACT_APP_API_URL}/report/favoriteReport`,
          withCredentials: true,
        });
        setFavoriteData(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [favoriteNumbers]);

  // console.log(favoriteData[0].observed)
  let waves = [];
  let currentFlows = [];
  let conditions = [];
  favoriteData.forEach((data, i) => {
    let cfs = data.observed.sort((a, b)=> new Date(a) - new Date(b))[0].cfs
    console.log( data.siteNumber, cfs);
    waves.push(<li key={`${i}${data.observed[0].date}`} className={`text text-sm h-10 md:text-lg`} ><NavLink className={'link-accent'} to={`/report/${data.siteNumber}`}>{data.wave}</NavLink></li>);
    currentFlows.push(<li key={`${i}${data.observed[0].date}`} className={`text-sm h-10 md:text-lg`} >{cfs} CFS</li>);
    conditions.push([cfs, data.siteNumber]);
  });
  const conditionsLi = getConditions(conditions).map((el, i) => (<li className={`text-sm h-10 md:text-lg`} key={i}>{el}</li>));

  return (
    <div>
      <h1 className="text-2xl font-robotoSlab font-bold text-center md:text-5xl">Hi {user.userName[0].toUpperCase() + user.userName.slice(1)}, welcome to your dashboard page.</h1>

      {favoriteData.length < 1 &&
        <div className='gap-y-3 pl-3 pr-3 mt-10'>
          <h2 className="text-xl font-bold text-center md:text-3xl">Visit reports and add your favorite surf spots.</h2>
        </div>}
      {favoriteData.length > 0 &&
        <div className='flex mt-10 justify-center gap-x-1'>
          <div className='flex flex-col gap-y-3 pl-3 pr-3'>
            <h2 className='text-xl font-bold md:whitespace-nowrap h-24 md:text-2xl sm:h-14'>Favorite Spot</h2>
            <ul
              className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-6 pr-6 rounded-bl-2xl h-full justify-center md:whitespace-nowrap'
            >
              {waves}
            </ul>
          </div>

          <div className='flex flex-col gap-y-3'>
            <h2 className='text-xl font-bold md:whitespace-nowrap h-24 md:text-2xl sm:h-14'>Current Flows</h2>
            <ul
              className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-8 pr-8 h-full justify-center md:whitespace-nowrap'
            >
              {currentFlows}
            </ul>
          </div>

          <div className='flex flex-col gap-y-3 pl-3 pr-3'>
            <h2 className='text-xl font-bold md:whitespace-nowrap h-24 md:text-2xl sm:h-14'>Conditions</h2>
            <ul
              className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-8 pr-8 rounded-br-2xl h-full justify-center md:whitespace-nowrap'
            >
              {conditionsLi}
            </ul>
          </div>
        </div>}
    </div>
  )
}

export default DashboardTable