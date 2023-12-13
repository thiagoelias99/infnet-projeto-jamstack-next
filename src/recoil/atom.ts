import { IUser } from "@/models/User";
import { atom } from "recoil";

export const loggedInUser = atom<IUser | null>({
    key: 'loggedInUser',
    default: null
})

export const updateCommets = atom<boolean>({
    key: 'updateCommets',
    default: false
})