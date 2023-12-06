'use client'

import { useState, useEffect } from 'react'
import SignDialog from '../Sign-Dialog'
import Logout from '../Sign-Dialog/Logout'

import { validateUserByToken } from '@/services/firebase'

const Login = () => {
    const [user, setUser] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            validateUserByToken(token)
                .then((user) => {
                    setUser(user?.name || '')
                })
        } else {
            setUser(null)
        }
    }, [user])

    function logoutUser() {
        localStorage.removeItem('token')
        setUser(null)
    }

    function loginUser(user: string | null) {
        setUser(user)
    }

    return (
        <div className='flex justify-center items-center h-full w-full md:w-auto'>
            {user ? <Logout userName={user} logoutFunction={logoutUser}/> : <SignDialog loginFunction={loginUser}/>}
        </div>
    )
}

export default Login