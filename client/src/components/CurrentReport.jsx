import React from 'react'
import { useParams } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { BiMap } from'react-icons/bi'
import useAuth from '../auth/useAuth';
import axios from 'axios';
import useReportHook from '../hooks/useReportHook';
import { getRange } from '../helpers/getRange';
import { getGif } from '../helpers/getGif';
import { getLocation } from '../helpers/getLocation';


const CurrentReport = ({ level, spot }) => {
  const { siteNumber } = useParams();
  const { user, authed } = useAuth();
  const [favorite, setFavorite] = React.useState(
    (user.favorites?.some(e => e.siteNumber == siteNumber)) ? true : false
  )
  const { getReport } = useReportHook();

  React.useEffect(() => {
    if (user.favorites?.some(e => e.siteNumber == siteNumber)) {
      setFavorite(true);
    }
    else {
      setFavorite(false);
    }
  }, [siteNumber, user.favorites, spot]);


  const addFavorite = async event => {
    let newArr;
    if (user.favorites) {
      user.favorites.push({ siteNumber: siteNumber, wave: spot });
      newArr = [...new Set(user.favorites)];
    } else {
      newArr = [{ siteNumber: siteNumber, wave: spot }];
    }
    setFavorite(!favorite);
    try {
      const response = await axios({
        method: 'PUT',
        data: {
          id: user._id,
          favorites: newArr,
        },
        url: `${process.env.REACT_APP_API_URL}/updateFavorites`,
        withCredentials: true,
      });
      console.log(response);

      if (user.favorites?.some(e => e.siteNumber == siteNumber)) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function handleDelete() {
    const index = user.favorites.map(e => e.siteNumber).indexOf(siteNumber);
    console.log(index);
    user.favorites.splice(index, 1);
    let newArr = user.favorites;
    setFavorite(!favorite);
    try {
      const response = await axios({
        method: 'PUT',
        data: {
          id: user._id,
          favorites: newArr,
        },
        url: `${process.env.REACT_APP_API_URL}/updateFavorites`,
        withCredentials: true,
      });
      console.log(response);

      if (user.favorites?.some(e => e.siteNumber == siteNumber)) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const currentLevel = level.cfs;
  const currentFeet = level.ft;
  const time = level.date;
  return (
    <div className="hero min-h-fit bg-base-200 mt-8 ">
      <div className="hero-content flex-col lg:flex-row">
        <img src={getGif(siteNumber)} alt="surfing gif" className="max-w-sm rounded-lg shadow-2xl" />
        <div className='flex flex-col items-center lg:items-start'>
          {authed && <div className='w-full flex justify-end h-16'>
            {favorite && <div className='flex flex-col items-center'>
              <AiFillStar
                onClick={handleDelete}
                className='text-3xl text-yellow-500 hover:text-4xl'
              />
              <p>Remove favorite</p>
            </div>}
            {!favorite && <div className='flex flex-col items-center'>
              <AiOutlineStar
                onClick={addFavorite}
                className='text-3xl hover:text-yellow-500 hover:text-4xl'
              />
              <p>Add to favorites</p>
            </div>}
          </div>}
          <h1 className=" py-3 text-5xl font-robotoSlab font-bold text-center sm:text-left">{spot}</h1>
          
          <p className="py-3 text-3xl max-w-80"><a href={getLocation(siteNumber)} target={'_blank'} rel="noreferrer" className='flex items-center gap-x-2 hover:text-slate-200'><BiMap /> Location</a></p>
          <p className="py-3 text-3xl max-w-80"><span className='font-bold'>Range of surfable flows: </span>~{getRange(siteNumber)} cfs</p>
          <p className="pt-5 pb-3 font-robotoSlab text-4xl max-w-80">The Report for {time}</p>
          <p className="py-3 text-2xl max-w-80">Flows are currently at <span className="font-bold"> {currentLevel} cubic feet per second (cfs)</ span> and <span className="font-bold">{currentFeet} feet high</span>.</p>
          <p className="py-3 text-2xl max-w-80">{getReport(siteNumber, currentLevel)}<span style={{ fontSize: 14 }}>  -Atlas</span></p>
          
        </div>
      </div>
    </div>
  )
}

export default CurrentReport
