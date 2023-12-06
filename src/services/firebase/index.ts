'use server'

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

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

    console.log('1')
    //Create token
    if (user) {
        console.log('user', user.uid)
        let createdUser: IUser | null | undefined = null
        try {
            const token = signToken(user.uid)
            console.log('token', token)

            // Create user on Firestore
            createdUser = await createUser({
                id: user.uid,
                name: name || '',
                email: email || '',
                token
            })
            console.log('createdUser', createdUser)

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

        const userDb = await validateUserByToken(token)

        if (!userDb) {
            return null
        }

        userDb.token = token
        userDb.id = user.uid

        return userDb
    }

    return null
}

// Firestore
const _db = getFirestore(firebaseApp)

async function createUser(user: IUser) {
    const _db2 = getFirestore(firebaseApp)
    console.log('createUser', user)
    if (!user.id) {
        return
    }
    console.log('aqui 1')
    try {
        console.log('user id', user.id)
        const docRef = doc(_db2, 'users', user.id)
        console.log('aqui 2')

        setDoc(docRef, {
            name: user.name,
            email: user.email,
            createdAt: new Date()
        },
        { merge: true })
        console.log('aqui 3')


    } catch(error) {
        console.error('error', error)   
    }
    return user
}

async function validateUserByToken(token: string) {
    const uid = verifyToken(token)
    if (uid) {
        const docRef = doc(_db, 'users', uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const user = docSnap.data()

            const userNormalized: IUser = {
                name: user.name,
                email: user.email
            }
            return userNormalized
        } else {
            return null
        }
    }
    return null
}

async function subscribeEmail(name: string, email: string) {
    const docRef = doc(_db, 'subscribers', email)

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