import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import axios from 'axios';

function Login() {
  let navigate = useNavigate();

  const { handleLogin } = useAuth();

  const [msg, setMsg] = React.useState({
    text: '',
    success: false,
  });

  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });

  function handleFormChange(event) {
    const { name, value, type, checked } = event.target;
    setLoginData(prevloginData => ({
      ...prevloginData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios({
        method: 'POST',
        data: {
          email: loginData.email,
          password: loginData.password,
        },
        url: 'http://localhost:5000/login',
        withCredentials: true,
      });
      console.log('From Server:', response.data.user);
      setMsg({
        text: response.data.message.msgBody,
        success: true,
      });
      handleLogin(response.data.user);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setMsg({
        text: err.response.data.message.msgBody,
        success: false,
      });
    }
  };

  return (
    <div className=''>
      <h1 className=''>
        Welcome back!
      </h1>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={handleFormChange}
          className=''
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleFormChange}
          className=''
        />
        <div className=''>
          <button className=''>Log in</button>
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

export default Login;
