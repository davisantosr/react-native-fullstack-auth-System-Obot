const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();

app.use(express.json()) //to pass the body

const authRoutes = require('./routes/auth')

//middleware for protect route
const verifyToken = require('./routes/verifyToken')


app.get('/', (req, res) => {
  res.send('Welcome to the auth system')

})

//Demo how to protect route

app.get('/api/user/profile', verifyToken, (req, res) => {
  res.send('This is the user profile')
})

app.use('/api/users', authRoutes);

mongoose.connect(
  `mongodb+srv://auth-system-user:${process.env.MONGO_PASSWORD}@cluster0.r18du.mongodb.net/authSystem?retryWrites=true&w=majority`,
  {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      app.listen(5000, () => console.log('Server is running on port 5000'))}
    )
    .catch(err => console.log(err))
