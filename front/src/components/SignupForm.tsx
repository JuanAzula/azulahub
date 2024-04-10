import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TokenService } from '../services/TokenService'
import { UserService } from '../services/UserService'

export const Signup = () => {
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const user = await UserService.postUser({
                name,
                email: username,
                password
            })

            window.localStorage.setItem(
                'LoggedUser', JSON.stringify(user)
            )
            TokenService.setToken(user.token)
            setUsername('')
            setPassword('')
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }




    const validateName = (input: string) => {
        if (input.trim() === '') {
            setEmailError('Name is required')
        } else {
            setEmailError('')
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

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleNameInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        handleNameChange(event)
        validateName(event.target.value)
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
                        className="login-input text-black"
                        type="text"
                        value={name}
                        id="name"
                        placeholder="name"
                        onChange={handleNameInputChange}
                    />
                    <input
                        className="login-input text-black"
                        type="text"
                        value={username}
                        id="email"
                        placeholder="email or username"
                        onChange={handleUsernameInputChange}
                    />
                    <input
                        className="login-input text-black"
                        type="password"
                        value={password}
                        id="password"
                        placeholder="password"
                        onChange={handlePasswordInputChange}
                    />
                    {passwordError && <div className="error-password">{passwordError}</div>}
                    {emailError && <div className="error-email">{emailError}</div>}
                    <button className="login-button" style={{ height: '30px' }} type="submit">
                        Sign up
                    </button>
                    <Link to="/login">Already have an account? Login!</Link>
                </form>
            </div>
        </div>
    )
}
