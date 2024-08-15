import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'

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
      newUser.role = 'user';

    //   save the user into the database
    await prisma.user.create({
      data:  newUser ,
    })

    res.status(201).send({ message: 'User created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Failed to create user!' })
  }
}
