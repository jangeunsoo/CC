// src/pages/Login.js
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // 여기에 실제 로그인 로직을 구현해야 합니다. (예: API 요청)
    if (email === 'user@example.com' && password === 'password') {
      setIsLoggedIn(true);
      alert('Login successful!');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>Welcome back!</h2>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
