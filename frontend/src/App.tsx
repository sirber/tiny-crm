import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated, selectIsSessionChecked } from './features/auth'
import { AppDispatch, RootState } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import NotFound from './pages/NotFound'
import Loader from './components/Loader'
import { useEffect } from 'react'
import { sessionCheck } from './features/auth'

export default function App() {
  // Store
  const dispatch = useDispatch<AppDispatch>()

  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  )

  const isSessionChecked = useSelector((state: RootState) =>
    selectIsSessionChecked(state)
  )

  // Session check
  useEffect(() => {
    dispatch(sessionCheck())
  }, [dispatch])

  if (!isSessionChecked) {
    return <Loader></Loader>
  }

  // Routes
  let routes
  if (!isAuthenticated) {
    routes = (
      <Route
        path='*'
        element={<Login />}
      />
    )
  } else {
    // TODO: authenticiated routes
    routes = (
      <Route
        path='*'
        element={<NotFound />}
      />
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </>
  )
}
