import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiMenuAltLeft } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { FiCommand } from 'react-icons/fi'

const Header = ({ setSearchBarOpened }) => {
    return (
        <div className="w-screen">
            <div
                className="w-9/12 mx-auto h-16 bg-opacity-30"
                data-testid="manga"
            >
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-2">
                        <AiFillHome className="text-2xl" />
                        <BiMenuAltLeft className="text-2xl" />
                        <h1 className="text-2xl font-bold">Manga Reader</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div
                            onClick={() => setSearchBarOpened(true)}
                            className="flex items-center cursor-pointer hover:brightness-95 transition hover:scale-95 space-x-2 text-gray-600 bg-gray-400 border border-gray-600 border-opacity-30 px-3 py-2 rounded-xl bg-opacity-30">
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
                        <div className="w-10 h-10 bg-gray-400 rounded-full bg-opacity-30 cursor-pointer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header