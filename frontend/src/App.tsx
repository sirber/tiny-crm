import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from './features/auth'
import { RootState } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import NotFound from './pages/NotFound'

export default function App() {
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  )

  let routes
  if (!isAuthenticated) {
    routes = <Route path='*' element={<Login />} />
  } else {
    // TODO: authenticiated routes
    routes = <Route path='*' element={<NotFound />} />
  }

  return (
    <>
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </>
  )
}
