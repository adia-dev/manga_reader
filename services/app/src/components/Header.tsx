import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { FiCommand } from 'react-icons/fi'
import { Link } from 'react-router-dom'
type Props = {
    triggerHeaderClass?: boolean
}

const Header = (props: Props) => {

    // if the scrollY is greater than 100, then add the shadow class to the header
    const [triggerHeaderClass, setTriggerHeaderClass] = React.useState(props.triggerHeaderClass || false)

    React.useEffect(() => {

        // check if it is possible to even scroll the page
        const isScrollable = document.documentElement.scrollHeight > window.innerHeight
        setTriggerHeaderClass(!isScrollable)

        const handleScroll = () => {
            if (window.scrollY > 100) {
                setTriggerHeaderClass(true)
            } else {
                setTriggerHeaderClass(false)
            }

        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    return (
        <div
            id="Header"
            className='flex justify-center fixed top-0 left-0 w-screen z-[100]'>
            <a href="/carousel" className="absolute right-5 h-12 text-white mt-5 p-5 top-0 flex items-center space-x-2 cursor-pointer">
                <p className="text-gray-400 hover:text-white transition-all duration-500 text-xs">
                    Carousel
                </p>
                <div className="bg-dark-secondary bg-opacity-20 px-2 rounded-full flex items-center justify-center py-1">
                    <span className="text-white text-xs bg-gradient-to-r from-[#FF6363] to-[#FFBD69] bg-clip-text text-transparent animate-pulse">beta</span>
                </div>
            </a>
            <div className="mt-5 flex items-center justify-between px-5 w-2/3 text-gray-500 h-12 bg-opacity-70 trnasition-all duration-300 "
                style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: `${triggerHeaderClass ? '0 0 10px 0 rgba(0,0,0,0.5)' : 'none'}`,
                    borderRadius: `${triggerHeaderClass ? '9999px' : 'none'}`,
                    backgroundColor: `${triggerHeaderClass ? 'rgba(0,0,0,0.5)' : 'none'}`

                }}
            >
                <div className="flex items-center space-x-2">
                    <Link to="/" className="group flex items-center space-x-2 cursor-pointer brightness-75 hover:brightness-100 transition delay-300">
                        <div className="w-6 h-6 rounded-full bg-dark-tertiary"></div>
                        <p className="text-dark-tertiary text-sm w-3 group-hover:w-[100px] transition-all delay-300 overflow-hidden whitespace-nowrap">Manga Reader</p>
                    </Link>
                    <div className="w-px h-5 bg-dark-tertiary rounded-full"></div>
                    <nav className="flex items-center space-x-2 text-sm pl-5">
                        <Link to="/" className="hover:text-white transition">Home</Link>
                        <p className="hover:text-white transition">Library</p>
                        <p className="hover:text-white transition">Settings</p>
                    </nav>
                </div>
                <div className="flex items-center space-x-2 w-1/4 whitespace-nowrap">
                    <div
                        className="flex items-center cursor-pointer w-full hover:brightness-95 transition justify-between hover:text-white text-gray-400 bg-gray-400 border border-gray-600 border-opacity-30 px-3 py-2 rounded-full bg-opacity-30">
                        <BsSearch className="" />
                        <p className="text-xs">Quick Search</p>
                        <div className="flex items-center text-xs space-x-1">
                            {/* if on mac FiCommand, else Ctrl */}
                            {
                                navigator.platform.indexOf("Mac") > -1 ? (
                                    <FiCommand className="" />
                                ) : (
                                    <span className="lowercase">Ctrl</span>
                                )
                            }
                            <span>+</span>
                            <span>K</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 px-5">
                    <Link to="/signup">
                        <p className='text-sm hover:bg-dark-tertiary hover:text-white px-2 py-1 transition rounded-2xl cursor-pointer'>Sign Up</p>
                    </Link>
                    <Link to="/login">
                        <p className='text-sm bg-dark-tertiary text-white px-2 py-1 transition rounded-2xl cursor-pointer'>Login</p>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Header