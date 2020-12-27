const express = require('express');

const app = express();

const authRoutes = require('./routes/auth')


app.get('/', (req, res) => {
  res.send('Welcome to the auth system')

})

app.use('/api/users', authRoutes);

app.listen(5000, () => console.log('Server is running on port 5000'))