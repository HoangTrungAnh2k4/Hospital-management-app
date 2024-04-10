import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Login.module.scss';
import logo from  'src/img/logo.png';

function Login() {
  // State for form fields and password visibility
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting', username, password);
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={clsx(styles['login-container'])}>
      <img src={logo} alt="App Logo" style={{width: '150px', height: '150px', display: 'block', margin: '0 auto'}} />
      <h1 style={{textAlign: 'center'}}>Login</h1>
      <form onSubmit={handleSubmit} className={clsx(styles['login-form'])}>
        <div className={clsx(styles['form-group'])}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
          />
        </div>
        <div className={clsx(styles['form-group'])} style={{position: 'relative'}}>
          <label htmlFor="password">Password</label>
          <input
            style={{paddingRight: '30px'}}
            type={showPassword ? 'text' : 'password'} // Toggle input type based on password visibility
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
          <button 
            type="button" 
            onClick={toggleShowPassword} 
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-60%)',
              height: '100%',
              width: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'black'
            }}
          > 
            {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>} 
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
