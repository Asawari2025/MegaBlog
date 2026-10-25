import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer, Toast } from './components'

function App() {
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef(null);
  const dispatch = useDispatch();

  const showToast = useCallback((message) => {
    setToastMessage(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(""), 4000);
  }, []);

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimer.current);
    setToastMessage("");
  }, []);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  return !loading? (
    <div className="app-shell">
        <Header onSuccess={showToast} />
        <Toast message={toastMessage} onDismiss={dismissToast} />
        <main className="site-main">
          <Outlet context={{ showToast }} />
        </main>
        <Footer/>
    </div>
  ): null
}

export default App
