// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB 연결 설정
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 간단한 사용자 스키마 및 모델 정의
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// 루트 경로 처리기
app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

// 로그인 엔드포인트
app.post('/login', async (req, res) => {
  console.log('Login request received'); // 로그인 요청이 도달했을 때 로그 출력

  const { id, password } = req.body;

  try {
    const user = await User.findOne({ id, password });
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid ID or password' });
    }
  } catch (err) {
    console.error('Error during login:', err); // 에러 발생 시 로그 출력
    res.status(500).json({ message: 'Server error' });
  }
});


// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
