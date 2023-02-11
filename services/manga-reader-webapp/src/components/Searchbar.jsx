import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiSearch, BiStar, BiTrash } from 'react-icons/bi'
import { BsBookmark, BsBookmarkDashFill, BsBookmarkFill, BsBookmarkPlus, BsEyeFill } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import mangas from '../data/mangas.json'

const Searchbar = ({ setSearchBarOpened, searchBarOpened }) => {

    const [query, setQuery] = useState('')
    const [recents, setRecents] = useState([
        {
            manga_id: 1,
            saved: true,
            favorite: true,
            manga: mangas[0]
        },
        // jujutsu kaisen
        {
            manga_id: 2,
            saved: false,
            favorite: false,
            manga: mangas[1]
        },
        // Bleach
        {
            manga_id: 3,
            saved: true,
            favorite: false,
            manga: mangas[2]
        },
        // Hell's Paradise: Jigokuraku
        {
            manga_id: 4,
            saved: true,
            favorite: false,
            manga: mangas[3]
        }
    ])

    const [results, setResults] = useState([])


    const BeautifiedMangaStatus = (status) => {
        switch (status) {
            case 'ongoing':
                return 'On Going';
            case 'completed':
                return 'Completed';
            case 'hiatus':
                return 'Hiatus';
            case 'cancelled':
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
            case 'ongoing':
                return 'green';
            case 'completed':
                return 'blue';
            case 'hiatus':
                return 'yellow';
            case 'cancelled':
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


        const debounce = setTimeout(async () => {
            if (query.length > 0) {
                const results = await axios.get(`https://api.mangadex.org/manga?title=${encodeURI(query)}&limit=5&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc`)
                const mappedResults = results.data.data.map((manga) => {
                    let cover = manga.relationships.find((rel) => rel.type === 'cover_art')
                    if (cover) {
                        cover = `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.256.jpg`
                    } else {
                        cover = 'https://mangadex.org/images/manga/0.jpg'
                    }

                    return {
                        id: manga.id,
                        title: manga.attributes.title.en,
                        cover,
                        rating: manga.attributes.contentRating,
                        saved: false,
                        saved_count: 1000,
                        read_count: 1_000_000,
                        status: manga.attributes.status,
                        path: `/manga/${manga.id}`
                    }
                })

                setResults(mappedResults)

                console.log(mappedResults)
            } else {
                setResults([])
            }
        }, 500)

        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
            clearTimeout(debounce)
        }
    }, [query, setSearchBarOpened])


    const OnInputChange = ({ target }) => {
        setQuery(target.value)
    }



    return (
        <div className='w-screen h-screen fixed top-0 left-0 z-40 bg-[#000000] bg-opacity-50  flex justify-center' style={{ visibility: searchBarOpened ? 'visible' : 'hidden' }}>
            <div className="fixed top-0 left-0 w-full h-full bg-[#000000] bg-opacity-50 " id="searchbar-background"></div>
            <div
                id="searchbar-content"
                className="bg-white rounded-xl w-1/2 h-fit mt-28 shadow-md z-50 overflow-hidden"
                style={{
                    visibility: searchBarOpened ? 'visible' : 'hidden',
                    transition: 'all 0.3s 0.1s ease-out',
                    transform: searchBarOpened ? 'scale(1) translateY(0%)' : 'scale(0.85) translateY(-20%)',
                    opacity: searchBarOpened ? '1' : '0',
                }}
            >
                <div className="flex justify-center items-center border-b px-5 space-x-2">
                    <BiSearch className="text-2xl text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={OnInputChange}
                        className="w-full outline-none py-3" placeholder='Search for a manga, an author, an artist...' />
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
                        results.length === 0 && recents.map((recent) => (
                            <div
                                key={`recent-${recent.manga_id}`}
                                className="flex items-center justify-between px-5 py-3 border-b hover:bg-gray-100 transition duration-200 cursor-pointer">
                                <div className="flex items-start space-x-2">
                                    <img src={recent.manga.cover} alt="" className="w-12 aspect-[1/1.5] brightness-75 hover:brightness-105 transition-all duration-500 delay-200 cursor-pointer hover:w-16 object-cover rounded-md border border-black" />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-xl">{recent.manga.title}</p>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center text-orange-400 text-xs cursor-pointer">
                                                <BiStar className="" />
                                                <p>{recent.manga.rating}</p>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-xs cursor-pointer">
                                                {
                                                    recent.saved ?
                                                        <BsBookmarkFill className="" />
                                                        :
                                                        <BsBookmark className="" />
                                                }
                                                <p>{recent.manga.saved_count}</p>
                                            </div>
                                            <div className="flex items-center space-x-1 text-gray-600 text-xs cursor-pointer">
                                                <BsEyeFill className="" />
                                                <p>{BeautifiedReadCount(recent.manga.read_count)}</p>
                                            </div>
                                        </div>
                                        <div className="my-1 flex items-center w-fit space-x-2 bg-gray-900 text-gray-200 p-1 text-xs rounded-md">
                                            <div className={`h-2 w-2 bg-${MangaStatusColor(recent.manga.status)}-500 rounded-full`}></div>
                                            <span>{BeautifiedMangaStatus(recent.manga.status)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-xl">
                                    <BiStar className="text-gray-400 hover:text-yellow-500 cursor-pointer transition duration-200" />
                                    {
                                        recent.saved ?
                                            <BsBookmarkDashFill className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-200" />
                                            :
                                            <BsBookmarkPlus className="text-gray-400 hover:text-blue-500 cursor-pointer transition duration-200" />
                                    }
                                    <IoCloseOutline className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-200" />
                                </div>
                            </div>
                        ))
                    }
                    {
                        results.map((result) => (
                            <div
                                key={`result-${result.id}`}
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
                                            <BsBookmarkPlus
                                                onClick={() => {
                                                    setRecents([...recents, result])
                                                }}
                                                className="text-gray-400 hover:text-blue-500 cursor-pointer transition duration-200" />
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