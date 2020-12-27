const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.send('Welcome to the auth system')

})

app.listen(5000, () => console.log('Server is running on port 5000'))