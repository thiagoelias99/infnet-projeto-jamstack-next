'use server'

import { getFirestore, collection, addDoc, doc, setDoc, getDoc, FirestoreError } from "firebase/firestore"

import { initializeApp } from "firebase/app"
import {
    getAuth,
    updateProfile,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { signToken, verifyToken } from '../tokens'
import { IUser } from '@/models/User'

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
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

// Sign up with email and password
async function signUp(email: string, password: string, name: string | null = null) {
    console.log('signUp', email, password, name)

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
        let createdUser: IUser | null | undefined = null
        try {
            const token = signToken(user.uid)

            createdUser = {
                id: user.uid,
                name: name || '',
                email: email || '',
                token
            }

        } catch (error) {
            console.error('error', error)
        }

        return createdUser
    }

    return null
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
        const name = user.displayName || ''
        const email = user.email || ''

        const userDb: IUser = {
            id: user.uid,
            name,
            email,
            token
        }
        return userDb
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

// Firestore
async function subscribeEmail(name: string, email: string) {
    const docRef = doc(db, 'subscribers', email)

    await setDoc(docRef, {
        name,
        email,
        createdAt: new Date()
    })

    return true
}

export {
    signUp,
    signIn,
    validateUserByToken,
    subscribeEmail
}