import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';

type Props = {}
type Manga ={
  id: string;
  type: string;

  attributes: {
    title: {
      en: string;
    },
    altTitles: {
      [key: string]: string;
    }[],
    description: {
      [key: string]: string;
    },
    isLocked: boolean,
    links: {
      [key: string]: string;
    },
    originalLanguage: string,
    lastVolume: string,
    lastChapter: string,
    publicationDemographic: string,
    status: string,
    year: number,
    contentRating: string,
    tags: {
      id: string,
      type: string,
      attributes: {
        name: {
          en: string;
        },
        description: {
          [key: string]: string;
        },
        group: string,
        version: number,
      },
      relationships: any[],
    }[],
    state: string,
    chapterNumbersResetOnNewVolume: boolean,
    createdAt: string,
    updatedAt: string,
    version: number,
    availableTranslatedLanguages: any[],
    latestUploadedChapter: any,
  },
  relationships: {
    id: string,
    type: string,
  }[],
}

const getMangaList = async (url: string): Promise<Manga[]> => {
  const response = await axios.get(url);
  return response.data.data;
};

const MangaFetch: React.FC = (props: Props) => {

 
    const [mangaList, setMangaList] = useState<Manga[]>([]);

  
  
    useEffect(() => {
      const fetchMangaList = async () => {
        const url = "https://api.mangadex.org/manga?order[createdAt]=desc&limit=5";
        const mangaList = await getMangaList(url);
        setMangaList(mangaList);
      };
      fetchMangaList();
    }, []);


    useEffect(() => {
      console.log(mangaList);
    }, [mangaList]);
    return (
      <>
        
        
          <ul>
            {mangaList.map((manga) => (

              <li className='text-white' key={manga.id}><img src="https://uploads.mangadex.org/covers/504cb09b-6f5d-4a2c-a363-6de16f8d96cc/51ebaf79-7c48-4b70-8303-a4d7a40e7887.jpg" alt='manga' className='h-52' />{manga.attributes.title.en}</li>
            ))}
          </ul>
        
        <button value="Click me" />;

      </>
    );
  };
  

export default MangaFetch;



