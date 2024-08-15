import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'

dotenv.config()

const app = express()
const port = process.env.API_PORT

// to make app understand json
app.use(express.json())


// Route for authentication-related operations
app.use("/api/auth", authRoute);

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
