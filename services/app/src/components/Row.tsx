import React ,{ useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';
import Manga from "../interfaces/Manga";
import mangas from "../data/mangasResponse.json";

type Props = {
    name: string,
    fetchUrl: string,
    isLargeRow?: boolean
    mangas?: any[]
}

const getMangaList = async (url: string): Promise<Manga[]> => {
    const response = await axios.get(url);
    return response.data.data;
  };

const Row = (props: Props) => {
    const [mangaList, setMangaList] = useState(mangas.data);

    useEffect(() => {
        const fetchMangaList = async () => {
          const url = props.fetchUrl;
          const data= await getMangaList(url);
          setMangaList(data);
        };
        fetchMangaList();
      }, []);

    return (
        // netflix like row of mangas
        <section className='w-full p-3'>
            <h1 className='text-xl text-white mt-6 ml-10'>{props.name || "Manga Row"}</h1>
            <div className='w-full flex items-center m-4 mt-0.5'>
                <div className="overflow-x-scroll flex items-center scrollbar">

                    {
                            mangaList.map((manga) => (
                            <div className='relative h-[250px] aspect-[0.7] brightness-75 bg-[#222] shadow-xl rounded-sm m-2 cursor-pointer hover:scale-105 group transition-all duration-300 hover:z-50 hover:border-[#fff] hover:border-2 hover:shadow-2xl hover:brightness-100 m-4'
                                key={manga.id}
                            >   
                                    <img src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find((rel)=>rel.type==="cover_art")?.attributes?.fileName}`} alt='manga' className='w-full h-full object-cover' />
                                    <p className='absolute bottom-5 left-2 p-2 transition-all duration-300 delay-300 text-white group-hover:z-50'>{manga.attributes.title.en}</p>
                                
                                <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#222] to-transparent'></div>
                                
                            </div>
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default Row