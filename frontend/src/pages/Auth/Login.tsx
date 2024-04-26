import { Button, Box, Typography, TextField } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import FormikFieldError from '../../components/forms/FormikFieldError'
import { useDispatch } from 'react-redux'
import { login } from '../../features/auth'
import { AppDispatch } from '../../store'
import { LoginValues } from '../../types/auth'
import { SubmitFunction } from '../../types/formik'
import Logo from '../../assets/people.png'
import { useNavigate } from 'react-router-dom'

const initialValues: LoginValues = {
  email: '',
  password: ''
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
})

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSubmit = (
    values: LoginValues,
    { setSubmitting }: SubmitFunction
  ) => {
    const { email, password } = values

    dispatch(login({ email, password }))
      .then(() => {
        navigate('/', { replace: true })
      })
      .catch((error) => {
        alert(error)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh'
      }}
    >
      <Card
        sx={{
          width: 400
        }}
      >
        <CardContent>
          <Typography
            variant='h5'
            gutterBottom
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img
              src={Logo}
              alt='Logo'
              style={{
                height: 30,
                width: 30,
                marginRight: '10px'
              }}
            />
            TinyCRM - Login
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Field name='email'>
                  {({ field }) => (
                    <TextField
                      {...field}
                      type='text'
                      label='Email'
                      fullWidth
                      margin='normal'
                    />
                  )}
                </Field>
                {errors.email && touched.email ? (
                  <FormikFieldError error={errors.email} />
                ) : null}

                <Field name='password'>
                  {({ field }) => (
                    <TextField
                      {...field}
                      type='password'
                      label='Password'
                      fullWidth
                      margin='normal'
                    />
                  )}
                </Field>
                {errors.password && touched.password ? (
                  <FormikFieldError error={errors.password} />
                ) : null}

                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    mt: 2
                  }}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  )
}
