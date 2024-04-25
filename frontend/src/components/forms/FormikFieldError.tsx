import { Typography } from '@mui/material'

export default function FormikFieldError({ error }: { error: string }) {
  return (
    <Typography sx={{ color: 'red', fontStyle: 'italic' }}>{error}</Typography>
  )
}
