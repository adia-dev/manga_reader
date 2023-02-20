import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import mangas from "../data/mangasResponse.json";
import Manga from "../interfaces/Manga";
type Props = {}


const getMangaList = async (url: string): Promise<Manga[]> => {
  const response = await axios.get(url);
  return response.data.data;
};

    const MangaFetch: React.FC = (props: Props) => {
    const [mangaList, setMangaList] = useState(mangas.data);


    useEffect(() => {
      const fetchMangaList = async () => {
        const url = "https://api.mangadex.org/manga?order[createdAt]=desc&limit=3&includes[]=cover_art";
        const data= await getMangaList(url);
        setMangaList(data);
      };
      fetchMangaList();
    }, []);

    return (
      <>
          <ul>
            {mangaList.map((manga) => (
              <li className='text-white' key={manga.id}>
                <img className='h-14' src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find((rel)=>rel.type==="cover_art")?.attributes?.fileName}`} alt="title" />
                <p>{manga.attributes.title.en}</p>
              </li>
            ))}
          </ul>
      </>
    );
  };
  

export default MangaFetch;



