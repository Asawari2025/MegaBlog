import {useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate, useOutletContext} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const { showToast } = useOutletContext()
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm()

    const create = async(data) => {
        setError("")
        setIsSubmitting(true)
        try {
            await authService.createAccount(data)
            await authService.login(data)

            const userData = await authService.getCurrentUser()
            if (!userData) {
                throw new Error("Your account was created, but we couldn't sign you in. Please sign in with your new account.")
            }

            dispatch(login({ userData }))
            showToast(`Your account is ready. Welcome to MegaBlog, ${userData.name}!`)
            navigate("/", { replace: true })
        } catch (submitError) {
            setError(submitError.message || "We couldn't create your account. Please try again.")
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
                <p className="auth-eyebrow">Join the conversation</p>
                <h2 className="auth-title">Create your account</h2>
                <p className="auth-description">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="auth-link"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="auth-error" role="alert">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: "Please enter your name.",
                        })}
                        />
                        {errors.name && <p className="field-error" role="alert">{errors.name.message}</p>}
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
                            required: "Please create a password.",
                            minLength: {
                                value: 8,
                                message: "Use at least 8 characters for your password.",
                            },
                        })}
                        />
                        {errors.password && <p className="field-error" role="alert">{errors.password.message}</p>}
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Creating account..." : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup