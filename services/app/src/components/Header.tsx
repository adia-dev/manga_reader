import React from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'

type Props = {}

const Header = (props: Props) => {
    return (
        <div
            id="Header"
            className='flex justify-center'>
            <div className="mt-5 flex items-center justify-between px-5 w-1/2 text-gray-500 h-12">
                <div className="flex items-center space-x-2">
                    <div className="group flex items-center space-x-2 cursor-pointer brightness-75 hover:brightness-100 transition delay-300">
                        <div className="w-6 h-6 rounded-full bg-dark-tertiary"></div>
                        <p className="text-dark-tertiary text-sm w-3 group-hover:w-[100px] transition-all delay-300 overflow-hidden whitespace-nowrap">Manga Reader</p>
                    </div>
                    <div className="w-px h-5 bg-dark-tertiary rounded-full"></div>
                    <nav className="flex items-center space-x-2 text-sm pl-5">
                        <p className="hover:text-white transition">Home</p>
                        <p className="hover:text-white transition">Library</p>
                        <p className="hover:text-white transition">Settings</p>
                    </nav>
                </div>
                <div className="flex items-center space-x-2 px-5">
                    <p className='text-sm hover:bg-dark-tertiary hover:text-white px-2 py-1 transition rounded-2xl cursor-pointer'>Sign Up</p>
                    <p className='text-sm bg-dark-tertiary text-white px-2 py-1 transition rounded-2xl cursor-pointer'>Login</p>

                </div>
            </div>
        </div>
    )
}

export default Header