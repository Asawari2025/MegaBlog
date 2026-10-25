import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LogoutBtn({ onSuccess }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const logoutHandler = async () => {
        setError("")
        setIsLoggingOut(true)
        try {
            await authService.logout()
            dispatch(logout())
            onSuccess?.("You have been signed out.")
            navigate("/", { replace: true })
        } catch (logoutError) {
            setError(logoutError.message || "We couldn't sign you out. Please try again.")
        } finally {
            setIsLoggingOut(false)
        }
    }
  return (
    <>
      <button
      className="logout-button"
      onClick={logoutHandler}
      disabled={isLoggingOut}
      >{isLoggingOut ? "Signing out..." : "Logout"}</button>
      {error && <span className="logout-error" role="alert">{error}</span>}
    </>
  )
}

export default LogoutBtn