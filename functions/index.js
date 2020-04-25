const functions = require('firebase-functions')
const cors = require('cors')
const express = require('express')

const admin = require('firebase-admin')

const { FieldValue } = admin.firestore

// admin.initializeApp(functions.config().firebase)
const serviceAccount = require('./triage-app-8e193-firebase-adminsdk-x99td-86ba7c12ad.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://triage-app-8e193.firebaseio.com'
})

const db = admin.firestore()
const regiostrationCodesRef = db.collection('registrationCodes')

/* Express */
const app = express()
app.use(cors())

const SERVER_ERROR = {
  success: false,
  error: 'server_error'
}

const REGISTRATION_KEY_INVALID_ERROR = {
  success: false,
  error: 'registration_key_invalid_error'
}

app.post('/checkEmployeeRegistrationCode', async (req, res) => {
  regiostrationCodesRef
    .where('code', '==', req.body.registrationCode)
    .get()
    // eslint-disable-next-line consistent-return
    .then(async snapshot => {
      if (snapshot.empty || snapshot.size > 1) {
        return res.send(REGISTRATION_KEY_INVALID_ERROR)
      }

      const doc = snapshot.docs[0]
      const docData = doc.data()
      if (docData.usedOnTimestamp !== undefined) {
        console.log('Error: Key already used')

        return res.send(REGISTRATION_KEY_INVALID_ERROR)
      }

      try {
        await doc.ref.update({
          usedOnTimestamp: FieldValue.serverTimestamp()
        })

        const newDoc = await doc.ref.get()
        const newDocData = newDoc.data()

        if (newDocData.usedOnTimestamp === undefined) {
          console.log('Error updating documents')
          return res.send(SERVER_ERROR)
        }

        console.log(newDoc.id, '=>', newDocData)
        try {
          const additionalClaims = {
            employeeAccount: true
          }
          const customToken = await admin
            .auth()
            .createCustomToken(newDoc.id, additionalClaims)

          // Send token back to client
          return res
            .status(200)
            .send({ success: true, userId: newDoc.id, token: customToken })
        } catch (error) {
          console.log('Error creating custom token:', error)
          return res.send(SERVER_ERROR)
        }
      } catch (err) {
        console.log('Error updating documents', err)
        return res.send(SERVER_ERROR)
      }
    })
    .catch(err => {
      console.log('Error getting documents', err)
      return res.send(REGISTRATION_KEY_INVALID_ERROR)
    })
})

app.get('*', (request, response) => {
  response.send('Hello from Express on Firebase!')
})

const api = functions.region('europe-west3').https.onRequest(app)

module.exports = {
  api
}
