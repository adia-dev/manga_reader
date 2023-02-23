import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import HelpBox from './HelpBox'
import Searchbar from './Searchbar'
import { Outlet } from 'react-router-dom'
import axios from "axios";
import FeaturedMangas from "./FeaturedMangas";
import Row from "./Row";

type Props = {};

async function getMangaRatingAndFollows(id:any) {
    const resp = await axios.get(`https://api.mangadex.org/statistics/manga/${id}`)
    const { rating, follows } = resp.data.statistics[id];

    return { rating, follows };
}

async function getMangaInformation(id:any) {
    const resp = await axios.get(`https://api.mangadex.org/manga/${id}?includes[]=cover_art&includes[]=author&includes[]=artist`)
    const data = resp.data.data;
    const randomIndex = Math.floor(Math.random() * data.attributes.altTitles.length);
    const mangaRatingAndFollows = await getMangaRatingAndFollows(data.id); 

    let cover = data.relationships.find((rel: any) => rel.type === 'cover_art')
                    ? `https://uploads.mangadex.org/covers/${id}/${data.relationships.find((rel: any) => rel.type === 'cover_art').attributes.fileName}`
                    : 'https://uploads.mangadex.org/covers/504cb09b-6f5d-4a2c-a363-6de16f8d96cc/51ebaf79-7c48-4b70-8303-a4d7a40e7887.jpg';

    // console.log("title en : ", data.attributes.title.en);
    // console.log("title random : ", data.attributes.altTitles[randomIndex]);
    // console.log("author : ", data.relationships[0].attributes.name);
    // console.log("artist : ", data.relationships[1].attributes.name);
    // console.log("Category : ", data.attributes.publicationDemographic);
    // console.log("cover : ", cover);
    //  console.log("rating : ", Math.round(( mangaRatingAndFollows.rating.bayesian + Number.EPSILON) * 100) / 100);
    return{
        title: data.attributes.title.en,
        altTitle: data.attributes.altTitles[randomIndex],
        cover,
        rating: Math.round(( mangaRatingAndFollows.rating.bayesian + Number.EPSILON) * 100) / 100,
        saved_count: mangaRatingAndFollows.follows,
        author: data.relationships[0].attributes.name,
        artist: data.relationships[1].attributes.name,
        status: data.attributes.status,
        category: data.attributes.publicationDemographic
    }
}


const MangaPage = (props: Props) => {
    const [results, setResults] = useState([])
    const { id } = useParams();
    
    useEffect( ()=>{
        const mangaStatistics =  getMangaInformation(id);
        console.log(mangaStatistics);
    },[])

  return (
    <div className="w-full h-full  pt-[90px] "
    data-testid='mangaDetails'
>   
{/* <div className="h-96 blur-xl w-full background-image bg-[url('https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/4d709522-25f5-4ac0-9b6c-3798a223c7ae.jpg')]"> */}
<div className="container">
      <div className="titles-author">
        <div className="main-title"><p>main-title</p></div>
        <div className="alt-title"><p>alt-title</p></div>
        <div className="author-name"><p>author-name</p></div>
      </div>
      <div className="buttons"></div>
      <div className="theme-chips"></div>
      <div className="manga-cover"></div>
      <div className="stats"></div>
      <div className="resume">test</div>
      <div className="chapter-list"></div>
    </div>
</div>

    
    
// </div>
)
};

export default MangaPage;
