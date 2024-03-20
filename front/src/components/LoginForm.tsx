import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginService from '../services/LoginService'
import { TokenService } from '../services/TokenService'

export const Login = () => {
    // const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        console.log('LOGIN', username, password)
        try {
            const user = await LoginService.LoginUser({
                username,
                password
            })

            window.localStorage.setItem(
                'LoggedUser', JSON.stringify(user)
            )
            console.log('USER', user)
            TokenService.setToken(user.token)
            console.log('USER TOKEN', user.token)
            console.log('mecachis')
            setUsername('')
            setPassword('')
            console.log('USER', user)
            console.log('USER TOKEN', user.token)
            console.log('Username', user.email)
            window.location.reload()
        } catch (e) {
            // setErrorMessage('Wrong credentials')
            console.log('no ha salido bien')
            setTimeout(() => {
                // setErrorMessage(null)
            }, 5000)
        }
    }





    const validateEmail = (input: string) => {
        if (input.trim() === '') {
            setEmailError('Email or username is required')
        } else {
            setEmailError('')
        }
    }

    const validatePassword = (input: string) => {
        if (input.length < 6) {
            setPasswordError('Password must be at least 6 characters')
        } else if (!/[A-Z]/.test(input)) {
            setPasswordError('Password must contain at least one uppercase letter')
        } else if (!/[\W_]/.test(input)) {
            setPasswordError('Password must contain at least one special character')
        } else {
            setPasswordError('')
        }
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleUsernameInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        handleUsernameChange(event)
        validateEmail(event.target.value)
    }
    const handlePasswordInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        handlePasswordChange(event)
        validatePassword(event.target.value)
    }

    return (
        <div className="absolute h-full w-full bg-[url('src/assets/img/hero.webp')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className='bg-black bg-opacity-50 absolute h-full w-full'>
                <nav>
                    <img src="src/assets/img/logo.webp" className='h-12' alt="" />
                </nav>
                <h2 className="login--header">Login</h2>

                <form onSubmit={handleLogin} className="login-form">
                    <input
                        className="login-input"
                        type="text"
                        value={username}
                        id="email"
                        placeholder="email or username"
                        onChange={handleUsernameInputChange}
                    />
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        id="password"
                        placeholder="password"
                        onChange={handlePasswordInputChange}
                    />
                    {passwordError && <div className="error-password">{passwordError}</div>}
                    {emailError && <div className="error-email">{emailError}</div>}
                    <button className="login-button" style={{ height: '30px' }} type="submit">
                        Login
                    </button>
                    <Link to="/signup">Don't have an account? Sign up!</Link>
                </form>
            </div>
        </div>
    )
}
