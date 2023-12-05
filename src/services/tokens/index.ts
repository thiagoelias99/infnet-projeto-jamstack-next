'use server'

import * as jwt from "jsonwebtoken"

export const signToken = (uid: string): string | "JWT_SECRET_NOT_FOUND" => {
    if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND"
    return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

export const verifyToken = (token: string): string | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" => {
    if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND"
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof decoded === "string") {
            return "INVALID_TOKEN"
        }
        const uid = decoded.uid
        return uid

    } catch (error) {
        return "INVALID_TOKEN"
    }
}