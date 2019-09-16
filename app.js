const express = require('express')
const mongoClient = require('mongodb').MongoClient
const app = express()


function initMongoDB() {
  return new Promise((resolve, reject) => {
    const mongoHost = process.env.MONGO_HOST
    mongoClient.connect(mongoHost, { useNewUrlParser: true }, (err, mongo) => {
      if (err) { reject() }
      resolve(mongo)
    })
  })
}

function initExpress() {
  return new Promise((resolve) => {
    app.use('/', (req, res) => {
      res.send('Hello World!')
    })
  
    app.listen(process.env.EXPRESS_PORT, () => {
      console.log(`Server running on PORT ${process.env.EXPRESS_PORT}`)
      resolve()
    })
  }) 

}

async function initApp() {
  const mongo = await initMongoDB()
  if (!mongo) { return console.error('Error connection DB!') }
  // await mongo.db(process.env.MONGO_DATABASE).collection('test').insertOne({ test: 'test' })
  await initExpress()
}

initApp()
  .then(() => console.log('App up!'))
  .catch(() => console.log('App down!'))
