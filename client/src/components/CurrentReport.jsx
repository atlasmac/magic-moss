import React from 'react'
import { useParams } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import useAuth from '../auth/useAuth';
import axios from 'axios';
import useReportHook from '../hooks/useReportHook';


const CurrentReport = ({ level, spot }) => {
  const { siteNumber } = useParams()
  const { user, authed } = useAuth()
  const [favorite, setFavorite] = React.useState(
    (user.favorites?.some(e => e.siteNumber == siteNumber)) ? true : false
  )
  const {getReport} = useReportHook()
  

  React.useEffect(() => {
    if (user.favorites?.some(e => e.siteNumber == siteNumber)) {
      setFavorite(true)
    }
    else {
      setFavorite(false)
    }
  }, [siteNumber, user.favorites, spot])


  const addFavorite = async event => {

    let newArr
    if (user.favorites) {
      user.favorites.push({ siteNumber: siteNumber, wave: spot })
      newArr = [...new Set(user.favorites)]
    } else {
      newArr = [{ siteNumber: siteNumber, wave: spot }]
    }
    setFavorite(!favorite)
    try {
      const response = await axios({
        method: 'PUT',
        data: {
          id: user._id,
          favorites: newArr,
        },
        url: 'http://localhost:5000/updateFavorites',
        withCredentials: true,
      });
      console.log(response);

      if (user.favorites?.some(e => e.siteNumber == siteNumber)) {
        setFavorite(true)
      } else {
        setFavorite(false)
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function handleDelete() {
    const index = user.favorites.map(e => e.siteNumber).indexOf(siteNumber)
    console.log(index)
    user.favorites.splice(index, 1);
    let newArr = user.favorites
    setFavorite(!favorite)
    try {
      const response = await axios({
        method: 'PUT',
        data: {
          id: user._id,
          favorites: newArr,
        },
        url: 'http://localhost:5000/updateFavorites',
        withCredentials: true,
      });
      console.log(response);

      if (user.favorites?.some(e => e.siteNumber == siteNumber)) {
        setFavorite(true)
      } else {
        setFavorite(false)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const currentLevel = level.cfs
  const currentFeet = level.ft
  const time = level.date
  return (
    <div className="hero min-h-fit bg-base-200 mt-8 ">
      <div className="hero-content flex-col lg:flex-row">
        <img src="https://placeimg.com/260/400/nature" alt="placeholder" className="max-w-sm rounded-lg shadow-2xl" />
        <div className='flex-col'>
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
          <h1 className="text-5xl font-bold">{spot}</h1>
          <p className="py-3 text-3xl">The Report for {time}.</p>
          <p className="py-3 text-2xl">Flows are currently at <span className="font-bold"> {currentLevel} cfs</ span> and <span className="font-bold">{currentFeet} feet</span> high at the gauge.</p>
          <p className="py-3 text-2xl">{getReport(siteNumber, currentLevel)}<span style={{ fontSize: 14 }}>  -Atlas</span></p>
        </div>
      </div>
    </div>
  )
}

export default CurrentReport
