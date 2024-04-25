import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { logout } from '../../features/auth'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logout()).then(() => {
      navigate('/', { replace: true })
    })
  }, [dispatch, navigate])

  return <></>
}
