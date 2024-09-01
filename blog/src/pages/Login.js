import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Card, CardContent, Button, TextField, Typography, Divider, Link, IconButton } from '@mui/material';

const Login = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();  

  const handleLogin = () => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      navigate('/user');  
    })
    .catch(err => {
      console.error(err);
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
          placeholder="아이디를 입력하세요"
          variant="outlined"
          fullWidth
          className="login-input"
        />

        <Typography variant="caption" className="login-label">
          Password
        </Typography>
        <TextField
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
