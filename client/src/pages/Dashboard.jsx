import React, { useState } from 'react';
import useAuth from '../auth/useAuth';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import useConditionHook from '../hooks/useConditionHook';

function Dashboard() {
  const { user, getUser, setGetUser } = useAuth();
  const [favoriteData, setFavoriteData] = useState([])
  const [favoriteNumbers, setFavoriteNumbers] = useState(user.favorites.map(el => el.siteNumber))
  const [editMode, setEditMode] = useState(false)
  const { getConditions } = useConditionHook();

  const edit = () => {
    setEditMode(!editMode)
  }
  
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

  let waves = [];
  let currentFlows = [];
  let conditions = [];
  favoriteData.forEach((data, i) => {
    console.log(data.observed[data.observed.length - 1].cfs, data.siteNumber)
    waves.push(<li key={`${i}${data.date}`} className={`ml-2`} ><NavLink className={'link-accent'} to={`/report/${data.siteNumber}`}>{data.wave}</NavLink></li>)
    currentFlows.push(<li key={`${i}${data.date}`} className={`ml-2`} >{data.observed[data.observed.length - 1].cfs} CFS</li>)
    conditions.push([data.observed[data.observed.length - 1].cfs, data.siteNumber])
  });
  const conditionsLi = getConditions(conditions).map((el, i) => (<li key={i}>{el}</li>))

  const [msg, setMsg] = React.useState({
    text: '',
    success: false,
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMsg({
        text: '',
        success: false,
      })
    }, 2500);
    return () => clearTimeout(timer);
  }, [user]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const profileImg = await uploadImage();
      const response = await axios({
        method: 'PUT',
        data: {
          id: user._id,
          profileImg: profileImg ? profileImg : user.profileImg,
          oldImg: user.profileImg,
        },
        url: 'http://localhost:5000/updateUser',
        withCredentials: true,
      });
      setMsg({
        text: response.data.message.msgBody,
        success: true,
      })
      edit();
      setGetUser(!getUser) 
    } catch (err) {
      console.log(err);
      setMsg({
        text: err.response.data.message.msgBody,
        success: false,
      })
    }
  }

  const [image, setImage] = React.useState(null);

  const uploadImage = async () => {
    const imageFormData = new FormData();
    imageFormData.append('file', image);
    // upload preset from cloudinary. Set to public.
    imageFormData.append('upload_preset', 'kljmy6nx');
    try {
      const response = await axios({
        method: 'POST',
        data: imageFormData,
        url: 'https://api.cloudinary.com/v1_1/dhaprkwnv/image/upload',
      });
      console.log(response);
      return response.data.public_id;
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="avatar flex-col items-center">
          <div className="w-80 rounded-full">
            <Image
              cloudName='dhaprkwnv'
              publicId={
                user.profileImg
                  ? user.profileImg
                  : 'https://res.cloudinary.com/dhaprkwnv/image/upload/v1663811759/cld-sample-3.jpg'
              }
            />
          </div>
          {editMode && <form
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col items-center pt-8'>
              <input
                className='flex pt-2 input w-full max-w-xs'
                type="file"
                onChange={event => setImage(event.target.files[0])}
              />
              <button
                className="btn mx-auto bg-sky-700 mt-8 mb-16 w-fit hover:bg-sky-800">
                Save
              </button>
            </div>
          </form>}
          {!editMode && <button
            className="btn bg-sky-700 mt-8 mb-16 w-fit hover:bg-sky-800"
            onClick={edit}>
            Change Profile Picture
          </button>}
          <div
							className={
								msg.success
									? 'text-green-400 text-center'
									: 'text-red-400 text-center'
							}
						>
							{msg ? msg.text : ''}
						</div>
        </div>

        <div>
          <h1 className="text-5xl font-bold text-center ">Hi {user.userName[0].toUpperCase() + user.userName.slice(1)}, welcome to your dashboard page.</h1>

          <div className=''>
            { favoriteData.length < 1 &&<div className='gap-y-3 pl-3 pr-3 mt-10'>
              <h2 className="text-3xl font-bold text-center ">Visit reports and add your favorite surf spots.</h2>
            </div>}

            {favoriteData.length > 0 &&<div className='flex mt-10 justify-center gap-x-1'>
             <div className='flex flex-col gap-y-3 pl-3 pr-3'>
              <h2 className='text-2xl font-bold whitespace-nowrap'>Favorite Spot</h2>
              <ul
                className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-6 pr-6 rounded-bl-2xl whitespace-nowrap'
              >
                {waves}
              </ul>
            </div>

            <div className='flex flex-col gap-y-3'>
              <h2 className='text-2xl font-bold whitespace-nowrap'>Current Flows</h2>
              <ul
                className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-8 pr-8 whitespace-nowrap'
              >
                {currentFlows}
              </ul>
            </div>

            <div className='flex flex-col gap-y-3 pl-3 pr-3'>
              <h2 className='text-2xl font-bold whitespace-nowrap'>Conditions</h2>
              <ul
                className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-8 pr-8 rounded-br-2xl whitespace-nowrap'
              >
                {conditionsLi}
              </ul>
            </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
