const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');  // 비밀번호 해싱을 위해 bcrypt 추가

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
  name: { type: String },  // 필수 조건 제거
  phoneNum: { type: String },  // 필수 조건 제거
  email: { type: String },  // 필수 조건 제거
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
    const user = await User.findOne({ id });
    if (user && await bcrypt.compare(password, user.password)) {  // 비밀번호 비교
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid ID or password' });
    }
  } catch (err) {
    console.error('Error during login:', err); // 에러 발생 시 로그 출력
    res.status(500).json({ message: 'Server error' });
  }
});

// 회원가입 엔드포인트
app.post('/register', async (req, res) => {
  console.log('Register request received'); // 회원가입 요청이 도달했을 때 로그 출력

  const { id, password, name, phoneNum, email } = req.body;

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 생성
    const newUser = new User({
      id,
      password: hashedPassword,  // 해싱된 비밀번호 저장
      name,
      phoneNum,
      email,
    });

    // 사용자 저장
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
