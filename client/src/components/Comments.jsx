import React from 'react'
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';


const Comments = () => {
  const { user, authed } = useAuth();
  const [commentsArr, setCommentsArr] = React.useState([]);
  const [getComments, setGetComments] = React.useState(false)
  const { siteNumber } = useParams();


  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'Get',
          url: `http://localhost:5000/comment/${siteNumber}`,
          withCredentials: true,
        });
        setCommentsArr(response.data)
      } catch (err) {
        console.log(err)
      }
    })();
  }, [siteNumber, getComments])

  const comments = commentsArr.map(e => {
    console.log(e)
    return (
      <div key={e._id}>
        <div className='flex'>
          <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed bg-slate-700">
            <strong>{e.user.userName}</strong> <span className="text-xs text-gray-400">{dayjs(e.createdAt).format('DD/MM/YYYY')}</span>
            <p className="text-sm">
              {e.comment}
            </p>
          </div>
        </div>
      </div>
    )
  })

  const [msg, setMsg] = React.useState({
    text: '',
    success: false,
  });
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
        url: `http://localhost:5000/comment/createComment/${siteNumber}`,
        withCredentials: true,
      });
      setGetComments(!getComments);
      console.log('From Server:', response);
      setMsg({
        text: response.data.message.msgBody,
        success: true,
      });
      event.target.reset();
    } catch (err) {
      setMsg({
        text: err.response.data.message.msgBody,
        success: false,
      });
      console.log(err.response);
    }
  };

  return (
    <div className="min-h-fit bg-base-200">
      <div className='antialiased mx-auto max-w-screen-sm'>
        <div className='flex-col space-y-8'>
          <div className='text-center'>
            <h3 className="mb-4 text-lg font-semibold pt-8">Comments</h3>
          </div>
          {comments}
        </div>
        {!authed &&
          <div>
            <h3>Log in or sign up to comment</h3>
          </div>
        }
        {authed &&
          <div className="max-w-screen-sm">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <div className="label-text text-center mx-auto font-semibold">Add Comment</div>
                  </label>
                  <textarea
                    className="textarea textarea-bordered border-white h-24 bg-slate-700"
                    type="text"
                    onChange={handleFormChange}
                    name="comment"
                    value={formData.comment}
                    placeholder="....">
                  </textarea>
                  <div className={
                    msg.success
                      ? 'text-success text-center'
                      : 'text-warning text-center'
                  }>
                    {msg ? msg.text : ''}
                  </div>
                  <div className='self-center'>
                    <button className="btn btn-success mt-8 mb-16">
                      Post Comment
                    </button>
                  </div>

                </div>
                {/* <label>Comment</label>
                <input
                  className='textarea'
                  type="text"
                  onChange={handleFormChange}
                  name="comment"
                  value={formData.comment}
                  placeholder="comment"
                />

              <button>
                Post Comment
              </button> */}
              </form>
            </div>
          </div>
        }
      </ div>
    </div>
  )
}

export default Comments
