'use client'

import {  useEffect } from 'react'
import SignDialog from '../Sign-Dialog'
import Logout from '../Sign-Dialog/Logout'

import { validateUserByToken } from '@/services/firebase'
import { useRecoilState } from 'recoil'
import { loggedInUser } from '@/recoil/atom'
import { IUser } from '@/models/User'

const Login = () => {
    const [user, setUser] = useRecoilState(loggedInUser)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userName = localStorage.getItem('user_name')
        const userId = localStorage.getItem('user_id')

        const userStored: IUser = {
            id: userId || '',
            name: userName || '',
            email: '',
            token: token || ''
        }

        if (token) {
            validateUserByToken(token)
                .then((user) => {
                    if (!user) {
                        setUser(null)
                    } else {
                        setUser(userStored)
                    }
                })
        } else {
            setUser(null)
        }
    }, [user])

    function logoutUser() {
        localStorage.removeItem('token')
        localStorage.removeItem('user_name')
        localStorage.removeItem('user_id')
        setUser(null)
    }

    function loginUser(user: IUser | null) {
        setUser(user)
    }

    return (
        <div className='flex justify-center items-center h-full w-full md:w-auto'>
            {user ? <Logout userName={user.name} logoutFunction={logoutUser} /> : <SignDialog loginFunction={loginUser} />}
        </div>
    )
}

export default Login