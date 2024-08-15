import express from 'express'
import { registerValidationSchema } from '../validationSchema/register.login.validation.js'
import { register } from '../controllers/auth.controller.js'
import {validateReqBody} from "../middleware/validation.middleware.js"

const router = express.Router()

router.post('/register',validateReqBody(registerValidationSchema), register)

export default router
