import React, { useEffect } from 'react'
import mangas from '../data/mangas.json'
import { BiChevronLeft } from 'react-icons/bi'

type Props = {}

const FeaturedMangas = (props: Props) => {

    const [currentMangaIndex, setCurrentMangaIndex] = React.useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentMangaIndex === mangas.length - 1) {
                setCurrentMangaIndex(0)
            } else {
                setCurrentMangaIndex(currentMangaIndex + 1)
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentMangaIndex]);

    const tags = [
        {
            name: 'Action',
            color: 'green'
        },
        {
            name: 'Adventure',
            color: 'yellow'
        },
        {
            name: 'Slice of Life',
            color: 'blue'
        },
        {
            name: 'Comedy',
            color: 'orange'
        },
        {
            name: 'Drama',
            color: 'pink'
        },
        {
            name: 'Fantasy',
            color: 'yellow'
        },
        {
            name: 'Sorcecery',
            color: 'purple'
        }
    ]

    const handleNextManga = () => {
        if (currentMangaIndex === mangas.length - 1) {
            setCurrentMangaIndex(0)
        } else {
            setCurrentMangaIndex(currentMangaIndex + 1)
        }
    }

    const handlePrevManga = () => {
        if (currentMangaIndex === 0) {
            setCurrentMangaIndex(mangas.length - 1)
        } else {
            setCurrentMangaIndex(currentMangaIndex - 1)
        }
    }


    return (
        <div className='w-10/12 mx-auto z-10 h-[400px] overflow-hidden relative rounded-xl mb-8'>
            <div className="w-full h-full scale-105 absolute left-0 top-0 -z-10"
                style={{
                    backgroundImage: `url(${mangas[currentMangaIndex].cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '20% 20%',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(2px) brightness(0.6)'
                }}></div>
            <div className='absolute p-10'>
                <p className='text-gray-300'>Chapter: {mangas[currentMangaIndex].chapter} | [EN]</p>
                <p className='text-4xl font-bold text-white py-3'>{mangas[currentMangaIndex].title}</p>
                <p className='text-white text-sm w-1/3 h-[125px]'>{mangas[currentMangaIndex].description}</p>
                {/* tags */}
                <div className="flex items-center space-x-2 py-3">
                    {
                        tags
                            .slice(0, 4)
                            .map((tag, index) => (
                                <div key={index} className="flex items-center space-x-2 px-2 py-1
                            bg-black bg-opacity-40 rounded-full
                            hover:scale-105 transition-all duration-200
                            cursor-pointer hover:bg-dark-quaternary hover:text-dark-primary text-gray-300 text-xs">
                                    <div className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: tag.color }}
                                    ></div>
                                    <p className=''>{tag.name}</p>
                                </div>
                            ))
                    }
                    {
                        tags.length > 4 && (
                            <div className="flex items-center space-x-2 px-2 py-1
                            bg-black bg-opacity-40 rounded-full
                            hover:scale-105 transition-all duration-200
                            cursor-pointer hover:bg-dark-quaternary hover:text-dark-primary text-gray-300 text-xs">
                                <div className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: 'gray' }}
                                ></div>
                                <p className=''>+{tags.length - 4}</p>
                            </div>
                        )
                    }
                </div>
                <div draggable="true" className="absolute right-10 top-10 w-40 h-60 hover:animate-pulse hover:transform hover:-skew-y-3 hover:scale-110 transition-all duration-500 cursor-pointer">
                    <div className="absolute top-2 left-2 w-[170px] h-60 bg-gray-100 rounded-xl shadow-2xl "></div>
                    <div className="absolute top-1 left-1 w-[170px] h-60 bg-gray-100 rounded-xl shadow-2xl "></div>
                    <div className="absolute top-0 left-0 w-40 h-60 bg-gray-100 rounded-xl shadow-2xl  overflow-hidden">
                        <img src={mangas[currentMangaIndex].cover} alt="" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex items-center space-x-2 mt-10">
                    <button className="rounded-xl bg-dark-tertiary text-dark-primary px-4 py-2 w-24 hover:scale-105 transition duration-500">Read</button>
                    <button className="rounded-xl text-dark-primary bg-white px-4 py-2 min-w-24 whitespace-nowrap hover:scale-105 transition duration-500">View Info</button>
                </div>
            </div>

            <div className="absolute bottom-5 right-0 mr-5 flex items-center space-x-4">
                <div className="w-12 h-12 hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer rounded-full overflow-hidden bg-gray-300 hover:bg-white flex justify-center items-center"
                    onClick={handlePrevManga}>
                    <BiChevronLeft className='text-3xl text-dark-primary' />
                </div>
                <div className="w-12 h-12 hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer rounded-full overflow-hidden bg-gray-300 hover:bg-white flex justify-center items-center"
                    onClick={handleNextManga}
                >
                    <BiChevronLeft className='text-3xl text-dark-primary transform rotate-180' />
                </div>
            </div>

        </div >
    )
}

export default FeaturedMangas