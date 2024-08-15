import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'
import  jwt  from 'jsonwebtoken'

// ? Function to register new user
export const register = async (req, res) => {
  // extract user details from req.body
  const newUser = req.body
  try {
    //   check if the email already exists
    const notUniqueEmail = await prisma.user.findUnique({
      where: { email: newUser.email },
    })
    // if email already exists then throw error :
    if (notUniqueEmail) {
      return res.status(409).send({ message: 'This email already exists.' })
    }

    //   before saving the user, lets has the plain password
    const plainPassword = newUser.password
    const saltRound = 10
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound)

    //   update new users password with hashed password
    newUser.password = hashedPassword

    // Set default role as 'user' (or 'admin' as needed)
    newUser.role = 'user'

    //   save the user into the database
    await prisma.user.create({
      data: newUser,
    })

    res.status(201).send({ message: 'User created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Failed to create user!' })
  }
}

// ? Function to login user into the system
export const login = async (req, res) => {
  // extract login credentials from req.body
  const { username, password } = req.body

  try {
    //   check if username is valid/exists in the database
    const user = await prisma.user.findUnique({
      where: { username },
    })
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid credentials' })
    }

    const age = 1000 * 60 * 60 * 24 * 7
    const token = jwt.sign(
      {
        id : user.id,
        username: user.username,
        
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    )

    // Extract user information excluding password
    const { password: userPassword, ...userInfo } = user

    // Set the token in an HTTP-only cookie and send the response
    res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .send(userInfo)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Failed to login!!' })
  }
}

//? logout function
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
  };