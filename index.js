import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.API_PORT

// to make app understand json
app.use(express.json())

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
