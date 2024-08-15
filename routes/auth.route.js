import express from 'express'
import { registerValidationSchema } from '../validationSchema/register.login.validation.js'
import { register } from '../controllers/auth.controller.js'
import { validateReqBody } from '../middleware/validation.middleware.js'
import { login } from '../controllers/auth.controller.js'
import { loginValidationSchema } from '../validationSchema/register.login.validation.js'
import { logout } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', validateReqBody(registerValidationSchema), register)
router.post('/login', validateReqBody(loginValidationSchema), login)
router.post('/logout', logout)

export default router
