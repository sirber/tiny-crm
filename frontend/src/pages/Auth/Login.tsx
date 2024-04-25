import { Button, Box, Typography, TextField } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import FormikFieldError from '../../components/FormikFieldError'

interface LoginValues {
  email: string
  password: string
}

const initialValues: LoginValues = {
  email: '',
  password: ''
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
})

export default function Login() {
  const handleSubmit = (values: LoginValues) => {
    console.log(values) // Do something with the form values, like submitting to a server
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
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
          >
            TinyCRM - Login
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Field
                  name='email'
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus={true}
                      type='text'
                      label='Email'
                      fullWidth
                      margin='normal'
                    />
                  )}
                />
                {errors.email && touched.email ? (
                  <FormikFieldError error={errors.email} />
                ) : null}

                <Field
                  name='password'
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type='password'
                      label='Password'
                      fullWidth
                      margin='normal'
                    />
                  )}
                />
                {errors.password && touched.password ? (
                  <FormikFieldError error={errors.password} />
                ) : null}

                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                  disabled={isSubmitting}
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
