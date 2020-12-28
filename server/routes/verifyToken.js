const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  const token = req.header('auth-token')
  if(!token) return res.status(401).send('Acess denied')

  //verify token
  try {
    const verified = jwt.verify(token, 'SUPERSECRET123') //key must to be pass from enviroment variables
    req.user = verified;
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}