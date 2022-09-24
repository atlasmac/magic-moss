import React from 'react';
import axios from 'axios';

function SignUp() {
  const [msg, setMsg] = React.useState({
    text: '',
    success: false,
  });

  const [signUpData, setSignUpData] = React.useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleFormChange(event) {
    const { name, value, type, checked } = event.target;
    setSignUpData(prevSignUpData => ({
      ...prevSignUpData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(signUpData, 'Sign Up Attempt Sent');
    try {
      const response = await axios({
        method: 'POST',
        data: {
          userName: signUpData.userName,
          email: signUpData.email,
          password: signUpData.password,
          confirmPassword: signUpData.confirmPassword,
        },
        url: 'http://localhost:5000/signup',
        withCredentials: true,
      });
      console.log('From Server:', response);
      setMsg({
        text: response.data.message.msgBody,
        success: true,
      });
    } catch (err) {
      setMsg({
        text: err.response.data.message.msgBody,
        success: false,
      });
      console.log(err.response);
    }
  };

  return (
    <div className=''>
      <h1 className=''>SignUp</h1>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          name='userName'
          placeholder='userName'
          onChange={handleFormChange}
          className='input input-bordered w-full max-w-xs'
        />
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={handleFormChange}
          className='input input-bordered w-full max-w-xs'
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleFormChange}
          className='input input-bordered w-full max-w-xs'
        />
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          onChange={handleFormChange}
          className='input input-bordered w-full max-w-xs'
        />
        <div className='card-actions justify-center mt-4'>
          <button className='btn btn-primary'>Create User</button>
        </div>
      </form>
      <div
        className={
          msg.success
            ? 'text-success text-center'
            : 'text-warning text-center'
        }
      >
        {msg ? msg.text : ''}
      </div>
    </div>
  );
}

export default SignUp;
