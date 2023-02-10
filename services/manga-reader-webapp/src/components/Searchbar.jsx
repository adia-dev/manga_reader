import React, { useEffect, useState } from 'react'
import { BiSearch, BiStar, BiTrash } from 'react-icons/bi'
import { BsBookmark, BsBookmarkDash, BsBookmarkDashFill, BsBookmarkFill, BsBookmarkPlus, BsBookmarkPlusFill, BsEyeFill } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'

const Searchbar = ({ setSearchBarOpened }) => {

    const [query, setQuery] = useState('')
    const [results, setResults] = useState([
        {
            id: 1,
            title: 'One Piece',
            cover: 'https://webservice-livre.tmic-ellipses.com/couverture/9782344013229.jpg',
            rating: 9.76,
            saved: true,
            saved_count: 1000,
            read_count: 293_392_000,
            status: 'Ongoing',
            path: '/manga/1'
        },
        // jujutsu kaisen
        {
            id: 2,
            title: 'Jujutsu Kaisen',
            cover: 'https://m.media-amazon.com/images/I/81Ae3hI5SbL.jpg',
            rating: 9.12,
            saved: false,
            saved_count: 1000,
            read_count: 18_292_391,
            status: 'Ongoing',
            path: '/manga/2'
        },
        // Hell's Paradise: Jigokuraku
        {
            id: 3,
            title: "Hell's Paradise: Jigokuraku",
            cover: 'https://kbimages1-a.akamaihd.net/e2aa6530-dc46-42fe-b680-a451cea32ddc/1200/1200/False/hell-s-paradise-jigokuraku-vol-1.jpg',
            rating: 9.92,
            saved: true,
            saved_count: 1000,
            read_count: 1_000_000,
            status: 'Completed',
            path: '/manga/3'
        }
    ])


    const BeautifiedMangaStatus = (status) => {
        switch (status) {
            case 'Ongoing':
                return 'On Going';
            case 'Completed':
                return 'Completed';
            case 'Hiatus':
                return 'Hiatus';
            case 'Cancelled':
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    }

    const BeautifiedReadCount = (count) => {
        if (count >= 1_000_000) {
            return `${(count / 1_000_000).toFixed(1)}M`
        } else if (count >= 1_000) {
            return `${(count / 1_000).toFixed(1)}K`
        } else {
            return count
        }
    }

    const MangaStatusColor = (status) => {
        switch (status) {
            case 'Ongoing':
                return 'green';
            case 'Completed':
                return 'blue';
            case 'Hiatus':
                return 'yellow';
            case 'Cancelled':
                return 'red';
            default:
                return 'gray';
        }
    }



    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.id === 'searchbar-background') {
                setSearchBarOpened(false)
            }
        }
        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])



    return (
        <div className='w-screen h-screen absolute top-0 left-0 z-40 bg-[#000000] bg-opacity-50  flex justify-center'>
            <div className="absolute top-0 left-0 w-full h-full bg-[#000000] bg-opacity-50 filter blur-3xl" id="searchbar-background"></div>
            <div className="bg-white rounded-xl w-1/2 h-fit mt-28 shadow-md z-50 overflow-hidden" id="searchbar-content">
                <div className="flex justify-center items-center border-b px-5 space-x-2">
                    <BiSearch className="text-2xl text-gray-400" />
                    <input type="text" className="w-full outline-none py-3" placeholder='Search for a manga, an author, an artist...' />
                    <div
                        className="flex items-center text-xs cursor-pointer hover:scale-105 transition-all duration-200"
                        onClick={() => { setSearchBarOpened(false) }}>
                        <span className='bg-gray-400 text-gray-100 p-1 rounded-lg'>esc</span>
                        <IoCloseOutline className="text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="flex items-center justify-between my-3 px-5">
                    <p>Recent</p>
                    <BiTrash
                        className="text-2xl text-gray-400 hover:text-red-500 cursor-pointer transition duration-200" />
                </div>
                <div className="flex flex-col overflow-y-scroll max-h-[350px]">
                    {
                        results.map((result) => (
                            <div
                                key={result.id}
                                className="flex items-center justify-between px-5 py-3 border-b hover:bg-gray-100 transition duration-200 cursor-pointer">
                                <div className="flex items-start space-x-2">
                                    <img src={result.cover} alt="" className="w-12 aspect-[1/1.5] brightness-75 hover:brightness-105 transition-all duration-500 delay-200 cursor-pointer hover:w-16 object-cover rounded-md border border-black" />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-xl">{result.title}</p>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center text-orange-400 text-xs cursor-pointer">
                                                <BiStar className="" />
                                                <p>{result.rating}</p>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-xs cursor-pointer">
                                                {
                                                    result.saved ?
                                                        <BsBookmarkFill className="" />
                                                        :
                                                        <BsBookmark className="" />
                                                }
                                                <p>{result.saved_count}</p>
                                            </div>
                                            <div className="flex items-center space-x-1 text-gray-600 text-xs cursor-pointer">
                                                <BsEyeFill className="" />
                                                <p>{BeautifiedReadCount(result.read_count)}</p>
                                            </div>
                                        </div>
                                        <div className="my-1 flex items-center w-fit space-x-2 bg-gray-900 text-gray-200 p-1 text-xs rounded-md">
                                            <div className={`h-2 w-2 bg-${MangaStatusColor(result.status)}-500 rounded-full`}></div>
                                            <span>{BeautifiedMangaStatus(result.status)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-xl">
                                    <BiStar className="text-gray-400 hover:text-yellow-500 cursor-pointer transition duration-200" />
                                    {
                                        result.saved ?
                                            <BsBookmarkDashFill className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-200" />
                                            :
                                            <BsBookmarkPlus className="text-gray-400 hover:text-blue-500 cursor-pointer transition duration-200" />
                                    }
                                    <IoCloseOutline className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-200" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Searchbar