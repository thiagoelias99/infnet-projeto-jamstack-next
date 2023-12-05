'use server'

import { initializeApp } from "firebase/app"
import {
    getAuth,
    updateProfile,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { signToken, verifyToken } from '../tokens'

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
console.log('firebase app created')

// Sign up with email and password
async function signUp(email: string, password: string, name: string | null = null) {
    const auth = getAuth()
    let message = ''
    const user = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user

            // Set user name
            if (user && name) {
                updateProfile(user, {
                    displayName: name
                })
            }
            signOut(auth)
            return user
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
            message = errorMessage
        })

            //Create token
    if (user) {
        const token = signToken(user.uid)
        return {
            token,
            message
        }
    }

    return {
        token: null,
        message
    }
}

async function signIn(email: string, password: string) {
    const auth = getAuth()

    const user = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user
            signOut(auth)
            return user
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
            return null
        })

    //Create token
    if (user?.uid) {
        const token = signToken(user.uid)
        return token
    }
    return null
}

async function validateUserByToken(token: string) {
    const uid = verifyToken(token)
    if (uid) {
        return uid
    }
    return null
}

export {
    signUp,
    signIn,
    validateUserByToken
}