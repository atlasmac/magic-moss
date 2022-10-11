import React from 'react';
import useAuth from '../auth/useAuth';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'cloudinary-react';

function Dashboard() {
  const { user } = useAuth();
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

  let waves = [];
  let currentFlows = [];
  favoriteData.forEach((data, i) => {
    console.log(data.observed[data.observed.length - 1].cfs)

    waves.push(<li key={`${i}${data.date}`} className={`ml-2`} ><NavLink className={'link-accent'} to={`/report/${data.siteNumber}`}>{data.wave}</NavLink></li>)
    currentFlows.push(<li key={`${i}${data.date}`} className={`ml-2`} >{data.observed[data.observed.length - 1].cfs} CFS</li>)
  });

  const [msg, setMsg] = React.useState({
    text: '',
    success: false,
  });

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

  console.log(user.profileImg)

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="avatar">
          <div className="w-100 rounded-full">
            <img src="https://placeimg.com/400/400/people" alt='placeholder' />
          </div>
          <form
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="file"
                onChange={event => setImage(event.target.files[0])}
              />
              <button>Change profile pic</button>
            </div>
          </form>
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
