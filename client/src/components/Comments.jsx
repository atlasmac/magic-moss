import React from 'react'
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { useParams } from 'react-router-dom';


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
  }, [siteNumber, commentsArr])

  const comments = commentsArr.map(e => {

    return (
      <div
        key={e._id}
      >
        <p><span>{e.user.userName} : </span>{e.comment}</p>
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
    <>
      <div>
        <h3>Comments</h3>
        {comments}
      </div>
      {!authed &&
        <div>
          <h3>Log in or sign up to comment</h3>
        </div>
      }
      {authed &&
        <div>
          <h4>Add a comment</h4>
          <div>
            <form onSubmit={handleSubmit} className='form'>
              <label>
                Comment
                <input
                  type="text"
                  onChange={handleFormChange}
                  name="comment"
                  value={formData.comment}
                />
              </label>

              <button>
                Post Comment
              </button>
            </form>
            <div>{msg ? msg.text : ''}</div>
          </div>
        </div>
      }
    </>
  )
}

export default Comments
