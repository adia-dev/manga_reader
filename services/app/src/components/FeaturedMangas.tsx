import React, { useEffect, useState } from 'react'
import mangas from '../data/mangas.json'
import { BiChevronLeft } from 'react-icons/bi'
import { ThemesColor } from "../data/chipsColor";
import axios from "axios";
import { Link } from 'react-router-dom';
type Props = {}

const FeaturedMangas = (props: Props) => {

    const [currentMangaIndex, setCurrentMangaIndex] = React.useState(0)
    const [results, setResults] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentMangaIndex === results.length - 1) {
                setCurrentMangaIndex(0)
            } else {
                setCurrentMangaIndex(currentMangaIndex + 1)
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentMangaIndex]);

    function getRandomProperty<T>(obj: T): [ T[keyof T]] | undefined {
        const keys = Object.keys(obj) as Array<keyof T>;
        if (keys.length === 0) {
          return undefined;
        }
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];
        const randomValue = obj[randomKey];
        return [randomValue];
      }
    

    function removeStringAfterDelimiter(str:string, delimiter:string) {
        const delimiterIndex = str.indexOf(delimiter);
        if (delimiterIndex !== -1) {
          return str.substring(0, delimiterIndex);
        }
        return str;
      }
    async function getMangaInformation() {
        const res = await axios.get(
          `https://api.mangadex.org/manga?order[rating]=desc&limit=5&includes[]=cover_art&contentRating[]=suggestive&hasAvailableChapters=true`
        );
        const data = res.data.data;

        const mappedResults = await Promise.all(data.map( async(manga: any) => {
                

            let cover = manga.relationships.find((rel: any) => rel.type === 'cover_art')
            if (cover) {
                cover = `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.256.jpg`
            } else {
                cover = 'https://uploads.mangadex.org/covers/504cb09b-6f5d-4a2c-a363-6de16f8d96cc/51ebaf79-7c48-4b70-8303-a4d7a40e7887.jpg'
            }
            const description=removeStringAfterDelimiter(manga.attributes.description.en ?? getRandomProperty(data.attributes.description)?? '', "---")

            const themes= manga.attributes.tags
            .filter((tag:any) => tag.attributes.group === "theme")
            .map((tag:any) => tag.attributes.name.en);
            const link = `/manga/${manga.id}`;

            return {
                    link,
                    title: manga.attributes.title.en,
                    cover,
                    description: description,
                    themes: themes,
                    category: manga.attributes.publicationDemographic
                };
        
    }));
    return mappedResults

   
}



    const handleNextManga = () => {
        if (currentMangaIndex === results.length - 1) {
            setCurrentMangaIndex(0)
        } else {
            setCurrentMangaIndex(currentMangaIndex + 1)
        }
    }

    const handlePrevManga = () => {
        if (currentMangaIndex === 0) {
            setCurrentMangaIndex(results.length - 1)
        } else {
            setCurrentMangaIndex(currentMangaIndex - 1)
        }
    }



    useEffect(() => {
        const fetchMangaInformation = async () => {
          const mangaInformation = await getMangaInformation();

          setResults(mangaInformation);

        };
    
        fetchMangaInformation();

      }, []);
      useEffect(() => {
        console.log(results)
      }, [results]);
    
    return (
        
        
        <div className='w-10/12 mx-auto z-10 h-[400px] overflow-hidden relative rounded-xl mb-8'>

            
           
            <div className="w-full h-full scale-105 absolute left-0 top-0 -z-10"
                style={{
                    backgroundImage: results.length > 0 ?`url(${results[currentMangaIndex].cover})`: '',
                    backgroundSize: 'cover',
                    backgroundPosition: '20% 20%',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(2px) brightness(0.6)'
                }}></div>
            <div className='static p-10'>
            
                {/* <p className='text-gray-300'>Chapter:  | tes</p> */}
                <p className='text-4xl font-bold text-white py-3'>{results.length > 0 ? results[currentMangaIndex].title: ''}</p>
                <p className='text-white text-sm w-2/3 h-[125px]'>{results.length > 0 ? results[currentMangaIndex].description : ''}</p>
                
                <div className="flex items-center space-x-2 py-3">
                    
                         {results.length > 0 ? results[currentMangaIndex].themes.map((theme: any, key: any) => (
                                <div key={key} className="flex items-center space-x-2 px-2 py-1
                            bg-black bg-opacity-40 rounded-full
                            hover:scale-105 transition-all duration-200
                            cursor-pointer hover:bg-dark-quaternary hover:text-dark-primary text-gray-300 text-xs">
                                    <div className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: ThemesColor[theme] }}
                                    ></div>
                                    <p className=''>{theme}</p>
                                </div>
                         )
                         ) : ''
            }
                    
                </div>
                
                <div draggable="true" className="absolute right-10 top-10 w-40 h-60 hover:animate-pulse hover:transform hover:-skew-y-3 hover:scale-110 transition-all duration-500 cursor-pointer">
                    <Link to={results.length ? results[currentMangaIndex].link : "/"}>
                    <div className="absolute top-2 left-2 w-[170px] h-60 bg-gray-100 rounded-xl shadow-2xl "></div>
                    <div className="absolute top-1 left-1 w-[170px] h-60 bg-gray-100 rounded-xl shadow-2xl "></div>
                    <div className="absolute top-0 left-0 w-40 h-60 bg-gray-100 rounded-xl shadow-2xl  overflow-hidden">
                        <img src={results.length > 0 ? results[currentMangaIndex].cover : ''} alt="" className="w-full h-full object-cover" />
                    </div>
                    </Link>
                </div>
            
                <div className="flex items-center space-x-2 mt-10">
                    <Link to={results.length ? results[currentMangaIndex].link : "/"}>
                        <button className="rounded-xl bg-dark-tertiary text-dark-primary px-4 py-2 w-24 hover:scale-105 transition duration-500">Read</button>
                    </Link>
                    <Link to={results.length ? results[currentMangaIndex].link : "/"}>
                        <button className="rounded-xl text-dark-primary bg-white px-4 py-2 min-w-24 whitespace-nowrap hover:scale-105 transition duration-500">View Info</button>
                    </Link>
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