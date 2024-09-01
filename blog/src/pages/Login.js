import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Card, CardContent, Button, TextField, Typography, Divider, Link, IconButton } from '@mui/material';

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();  

  const handleLogin = () => {
    fetch('http://localhost:5000/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password })  
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Login successful') {
        console.log('Login successful');
        navigate('/user');  
      } else {
        alert('Invalid ID or password');
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

  return (
    <div className="login-container">
      <Card onClick={(e) => e.stopPropagation()} className="login-card">
        <Typography variant="h5" component="h3" className="login-title">
          LOGIN
        </Typography>
        <Divider className="login-divider" />

        <Typography variant="caption" className="login-label">
          ID
        </Typography>
        <TextField
          value={id}  
          onChange={(e) => setId(e.target.value)}  
          placeholder="아이디를 입력하세요"
          variant="outlined"
          fullWidth
          className="login-input"
        />

        <Typography variant="caption" className="login-label">
          Password
        </Typography>
        <TextField
          value={password}  
          onChange={(e) => setPassword(e.target.value)} 
          type={visible ? 'text' : 'password'}
          placeholder="비밀번호를 입력하세요"
          variant="outlined"
          fullWidth
          className="login-input"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setVisible(!visible)}>
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        <Button onClick={handleLogin} variant="contained" color="primary" fullWidth className="login-button">
          <span className="login-button-text">
            로그인하기
          </span>
        </Button>

        <CardContent className="login-links">
          <Link href="#" className="login-link">
            아이디 찾기
          </Link>
          <Link href="#" className="login-link" style={{ marginLeft: '24px' }}>
            비밀번호 찾기
          </Link>
          <Link component="button" onClick={() => navigate('/join')} className="login-link" style={{ marginLeft: '24px' }}>
            회원가입
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
