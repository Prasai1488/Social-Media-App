import Yup from 'yup'

export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .max(30, 'Username must be at max 30 characters.')
    .required('Username is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required')
    .trim()
    .max(65, 'Email must be max 65 characters.')
    .lowercase(),
    
  password: Yup.string()
    .min(8, 'Password must be atleast 8 characters')
    .max(14, 'Password must be at max 14 characters')
    .required('Password is a required field'),

  firstName: Yup.string()
    .trim()
    .max(50, 'First name must be at max 50 characters.')
    .notRequired(),
  lastName: Yup.string()
    .trim()
    .max(50, 'Last name must be at max 50 characters.')
    .notRequired(),
  gender: Yup.string()
    .oneOf(
      ['male', 'female', 'other'],
      'Gender must be either male, female, or other'
    )
    .notRequired(),
})


export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required('Username is required'),
  password: Yup.string().required('Password is a required field'),
})
