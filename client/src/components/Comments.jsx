import React from 'react'
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { BsTrash } from 'react-icons/bs'
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

const Comments = ({ showLogin, setShowLogin, setShowSignUp, showSignUp }) => {
  const { user, authed } = useAuth();
  const [commentsArr, setCommentsArr] = React.useState([]);
  const [getComments, setGetComments] = React.useState(false);
  const { siteNumber } = useParams();

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'Get',
          url: `${process.env.REACT_APP_API_URL}/comment/${siteNumber}`,
          withCredentials: true,
        });
        setCommentsArr(response.data)
      } catch (err) {
        console.log(err);
      }
    })();
  }, [siteNumber, getComments]);

  async function deleteComment(commentId) {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const response = await axios({
          method: 'DELETE',
          data: { id: commentId },
          url: `${process.env.REACT_APP_API_URL}/comment/deleteComment`,
          withCredentials: true,
        });
        console.log('From Server:', response);
        setGetComments(!getComments);
      } catch (err) {
        console.log(err.response);
      }
    }
  }

  const comments = commentsArr.map(e => {
    return (
      <div key={e._id} className='flex'>

        <div className="flex flex-col flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed bg-base-100">
          <div className='flex justify-between items-center'>
            <div className='flex gap-x-3 items-center mb-3'>
              <div className='avatar'>
                <div className="w-20 rounded-full">
                  <Image
                    cloudName='dhaprkwnv'
                    publicId={
                      e.user.profileImg
                        ? e.user.profileImg
                        : 'https://res.cloudinary.com/dhaprkwnv/image/upload/v1663811759/cld-sample-3.jpg'
                    }
                  />
                </div>
              </div>
              <strong>{e.user.userName}</strong>

            </div>
            <span className="text-xs text-gray-400">{dayjs(e.createdAt).format('MM/DD/YYYY')}</span>
          </div>
          <p className="text-sm ml-20">
            {e.comment}
          </p>
          {e.user._id === user._id &&
            <button
              className='self-end justify-self-end'
              onClick={() => deleteComment(e._id)}
            >
              <BsTrash />
            </button>}
        </div>

      </div>
    )
  })

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
  }, [commentsArr]);


  const [formData, setFormData] = React.useState({
    comment: '',
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData(prevformData => ({
      ...prevformData,
      [name]: value,
    }));
  }
  const handleSubmit = async event => {
    event.preventDefault();
    console.log(formData, 'New Lesson Attempt Sent');
    try {
      const response = await axios({
        method: 'POST',
        data: {
          user: user._id,
          comment: formData.comment,
          likes: 0,
        },
        url: `${process.env.REACT_APP_API_URL}/comment/createComment/${siteNumber}`,
        withCredentials: true,
      });
      setGetComments(!getComments);
      console.log('From Server:', response);
      setMsg({
        text: response.data.message.msgBody,
        success: true,
      });
      setFormData({
        comment: '',
      })
    } catch (err) {
      setMsg({
        text: err.response.data.message.msgBody,
        success: false,
      });
      console.log(err.response);
    }
  };
  
  const login = () => {
    setShowLogin(true)
    setShowSignUp(false)
  };
  const signUp = () => {
    setShowLogin(false)
    setShowSignUp(true)
  };

  return (
    <div className="min-h-fit bg-base-200 pt-8 pb-8">
      <div className='antialiased mx-auto max-w-screen-sm'>
        {!authed &&
          <div className='text-center'>
            <h3 className="mb-4 text-2xl font-robotoSlab font-semibold"><Link to='/' onClick={login} className="btn btn-ghost rounded-btn text-xl">Log in</Link> or <Link to='/' onClick={signUp} className="btn btn-ghost rounded-btn text-xl">Sign up</Link> to comment</h3>
          </div>
        }
        {authed && 
        <div className='text-center'>
          <h3 className="mb-4 text-2xl font-robotoSlab font-semibold">Comments</h3>
        </div>
        }

        {authed &&
          <div className="max-w-screen-sm">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-control pl-3 pr-3">
                  <textarea
                    className="textarea h-24 bg-base-100"
                    type="text"
                    onChange={handleFormChange}
                    name="comment"
                    value={formData.comment}
                    placeholder="Add Comment">
                  </textarea>
                  <div className={
                    msg.success
                      ? 'text-success text-center'
                      : 'text-warning text-center'
                  }>
                    {msg ? msg.text : ''}
                  </div>
                  <div className='self-center'>
                    <button className="btn bg-sky-700 mt-8 mb-16 hover:bg-sky-800">
                      Post Comment
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        }

        <div className='flex-col space-y-8 max-h-screen-70 pr-3 pl-3 scrollbar-thin scrollbar-corner-full scrollbar-thumb-slate-400 scrollbar-track-base-200 scrollbar-thumb-rounded-md overflow-y-scroll'>
          {comments}
        </div>

      </ div>
    </div>
  )
}

export default Comments
