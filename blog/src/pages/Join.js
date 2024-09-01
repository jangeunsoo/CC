import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    ID: '',
    PASSWORD: '',
    confirmPASSWORD: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
   
    if (formData.PASSWORD !== formData.confirmPASSWORD) {
      alert('Passwords do not match');
      return;
    }

    
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: formData.ID, password: formData.PASSWORD }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'User registered successfully') {
          alert('Registration successful!');
          navigate('/user');
        } else {
          alert('Registration failed');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('An error occurred during registration');
      });
  };

  return (
    <div className="vh-900 d-flex align-center justify-center" onClick={() => navigate('/')}>
      <div className="join-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-10 mb-4 text-center">회원가입</h3>
        <hr className="join-divider" />

        <div className="join-form">
          <div className="form-group">
            <label>아이디</label>
            <input
              type="text"
              name="ID"
              placeholder="영문 대소문자/숫자, 4~16자"
              value={formData.ID}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input
              type={visible ? 'text' : 'password'}
              name="PASSWORD"
              placeholder="영문 대소문자/숫자,특수문자 중 3가지 이상 조합, 8~16자"
              value={formData.PASSWORD}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setVisible(!visible)}>
              {visible ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="form-group">
            <label>비밀번호 확인</label>
            <input
              type={visible ? 'text' : 'password'}
              name="confirmPASSWORD"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPASSWORD}
              onChange={handleChange}
            />
          </div>

          <button type="button" className="join-btn" onClick={handleSubmit}>
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
