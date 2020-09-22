// Public Key:
// BN34_hJAjkmgVyIcWJOajEn9dSGnEmRdEMgsYzFZf1RXJOiGR9W3O4RFkUEOlKqmlFU2iX9MRy_1Ycuvgg5LvUE

// Private Key:
// 3ZT8c4IifAP4FOXyC4M6zM1Z1Ual5rjLc3n2qYUmsGM

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')
const app = express()
const router = express.Router()

app.use(cors())
app.use(bodyParser.json())

const port = 4000
app.get('/', (req, res) => res.send('text text!'))
const dummyDb = { subscription: null } //dummy in memory store
const saveToDatabase = async subscription => {
  // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription
}
// The new /save-subscription endpoint
app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  await saveToDatabase(subscription) //Method to save the subscription to Database
  res.json({ message: 'success' })
})
const vapidKeys = {
  publicKey:
    'BN34_hJAjkmgVyIcWJOajEn9dSGnEmRdEMgsYzFZf1RXJOiGR9W3O4RFkUEOlKqmlFU2iX9MRy_1Ycuvgg5LvUE',
  privateKey: '3ZT8c4IifAP4FOXyC4M6zM1Z1Ual5rjLc3n2qYUmsGM',
}
//setting our previously generated VAPID keys
webpush.setVapidDetails(
  'mailto:myuserid@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend) => {
  webpush.sendNotification(subscription, dataToSend)
}
//route to test send notification
app.get('/send-notification', (req, res) => {
  const subscription = dummyDb.subscription //get subscription from your databse here.
  const message = 'Hello World'
  sendNotification(subscription, message)
  res.json({ message: 'message sent' })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;