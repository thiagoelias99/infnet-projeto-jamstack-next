'use client'

import { IUser } from '@/models/User'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { loggedInUser } from './atom'

interface RootProps {
    children: React.ReactNode
}

const ContextRoot = ({ children }: RootProps) => {
    return (
        <RecoilRoot>{children}</RecoilRoot>
    )
}

export default ContextRoot