import React, { useState } from 'react';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import { Image } from 'cloudinary-react';

const CloudinaryProfile = () => {
  const { user, getUser, setGetUser } = useAuth();
  const [editMode, setEditMode] = useState(false)

  const edit = () => {
    setEditMode(!editMode)
  }
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
        url: `${process.env.REACT_APP_API_URL}/user/updateUser`,
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
    <div className="avatar flex-col items-center">
      <div className="w-60 rounded-full md:w-80">
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
  )
}

export default CloudinaryProfile
