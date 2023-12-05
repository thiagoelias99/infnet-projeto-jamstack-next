import Logo from './logo'
import Links from './links'
import Login from './Login'

export default function Header() {
    return (
        <header className=' mx-auto absolute w-screen h-32 md:h-24 z-50 p-4 pb-0 md:pb-4 bg-black'>
            <div className='flex flex-col md:flex-row w-full h-full justify-between items-center md:items-end max-w-[1024px] mx-auto'>
                <Logo />
                <Links />
                <Login />
            </div>
        </header>
    )
}
