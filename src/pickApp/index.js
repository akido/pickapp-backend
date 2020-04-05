const AWS = require('aws-sdk')
const api = require('lambda-api')()
const jwt = require('jsonwebtoken')
const jwtSecret = 'J0n3x2AqxN5KGUFXL5rJLsBM'


api.get('/login', async (req, res) => {
  const user = users[req.body.email]
  if (!user) {
    return res.status(400).send({ 'The user is not registered' })
  }

  const token = jwt.sign(user, jwtSecret)
  return res.status(200).send({ 'status':'OK!',token })
})

api.get('/requests', async (req, res) => {
  return { status: 'ok' };
})

api.get('/requests/:requestId', (req, res) => {
  res.send('request ID: ' + req.params.requestId);
})

//Create request
api.post('/requests', (req, res) => {
  res.send('the request has been created');
})


exports.handler = async (event, context) => {
  return await api.run(event, context);
}

const users  = {
  'johan.lundholm@mail.se': {
    firstName: 'Johan',
    lastName: 'Lundholm',
    address: 'Alströmergatan 49',
    city: 'Stockholm',
    telfNumber: '+46 7439292 923'
  },
  'marie.eriksson@mail.se': {
    firstName: 'Marie',
    lastName: 'Eriksson',
    address: 'Sjösabrinken 30',
    city: 'Stockholm',
    telfNumber: '+46 73 4522 929'
  }
}
