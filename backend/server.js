const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');  

const app = express();
const port = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


app.use(cors());
app.use(express.json());


const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },  
  phoneNum: { type: String },  
  email: { type: String },  
});


const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});


app.post('/login', async (req, res) => {
  console.log('Login request received');

  const { id, password } = req.body;

  try {
    const user = await User.findOne({ id });
    if (user && await bcrypt.compare(password, user.password)) { 
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid ID or password' });
    }
  } catch (err) {
    console.error('Error during login:', err); 
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/register', async (req, res) => {
  console.log('Register request received'); 

  const { id, password, name, phoneNum, email } = req.body;

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      id,
      password: hashedPassword, 
      name,
      phoneNum,
      email,
    });

   
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
