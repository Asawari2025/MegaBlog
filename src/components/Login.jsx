import {useState} from 'react'
import {Link, useNavigate, useOutletContext} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const { showToast } = useOutletContext()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const login = async(data) => {
        setError("")
        setIsSubmitting(true)
        try {
            await authService.login(data)
            const userData = await authService.getCurrentUser()
            if (!userData) {
                throw new Error("We couldn't load your account after signing in. Please try again.")
            }

            dispatch(authLogin({ userData }))
            showToast(`Welcome back, ${userData.name}!`)
            navigate("/", { replace: true })
        } catch (submitError) {
            setError(submitError.message || "We couldn't sign you in. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <div className="auth-page">
        <div className="auth-card">
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full">
                        <Logo width="100%" />
                    </span>
        </div>
        <p className="auth-eyebrow">Welcome back</p>
        <h2 className="auth-title">Sign in to your account</h2>
        <p className="auth-description">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="auth-link"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: "Please enter your email address.",
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                {errors.email && <p className="field-error" role="alert">{errors.email.message}</p>}
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: "Please enter your password.",
                })}
                />
                {errors.password && <p className="field-error" role="alert">{errors.password.message}</p>}
                <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                >{isSubmitting ? "Signing in..." : "Sign in"}</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login