import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import HelpBox from "./HelpBox";
import Searchbar from "./Searchbar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import FeaturedMangas from "./FeaturedMangas";
import Row from "./Row";
import { BiStar } from 'react-icons/bi'
import { BsBookmark } from 'react-icons/bs'

type Props = {};

async function getMangaRatingAndFollows(id: any) {
  const resp = await axios.get(
    `https://api.mangadex.org/statistics/manga/${id}`
  );
  const { rating, follows } = resp.data.statistics[id];

  return { rating, follows };
}

function removeLinksFromDescription(input:string) {
    return input.replace(/\*\*Links:\*\*.*$/gm, '');
  }

  function removeStringAfterDelimiter(str:string, delimiter:string) {
    const delimiterIndex = str.indexOf(delimiter);
    if (delimiterIndex !== -1) {
      return str.substring(0, delimiterIndex);
    }
    return str;
  }
  
async function getMangaInformation(id: any) {
  const resp = await axios.get(
    `https://api.mangadex.org/manga/${id}?includes[]=cover_art&includes[]=author&includes[]=artist`
  );
  const data = resp.data.data;
  const randomIndex = Math.floor(
    Math.random() * data.attributes.altTitles.length
  );
  const mangaRatingAndFollows = await getMangaRatingAndFollows(data.id);

  let cover = data.relationships.find((rel: any) => rel.type === "cover_art")
    ? `https://uploads.mangadex.org/covers/${id}/${
        data.relationships.find((rel: any) => rel.type === "cover_art")
          .attributes.fileName
      }`
    : "https://uploads.mangadex.org/covers/504cb09b-6f5d-4a2c-a363-6de16f8d96cc/51ebaf79-7c48-4b70-8303-a4d7a40e7887.jpg";

  const altTitle=Object.values(data.attributes.altTitles[randomIndex])
  const description=removeStringAfterDelimiter(data.attributes.description.en, "**Links:**")
  console.log(description);
  // console.log("title en : ", data.attributes.title.en);
  // console.log("title random : ", data.attributes.altTitles[randomIndex]);
  // console.log("author : ", data.relationships[0].attributes.name);
  // console.log("artist : ", data.relationships[1].attributes.name);
  console.log("Category : ", data.attributes.publicationDemographic);
  // console.log("cover : ", cover);
  //  console.log("rating : ", Math.round(( mangaRatingAndFollows.rating.bayesian + Number.EPSILON) * 100) / 100);
  return {
    title: data.attributes.title.en,
    altTitle: altTitle,
    cover,
    description: description,
    rating:
      Math.round(
        (mangaRatingAndFollows.rating.bayesian + Number.EPSILON) * 100
      ) / 100,
    saved_count: mangaRatingAndFollows.follows,
    author: data.relationships[0].attributes.name,
    artist: data.relationships[1].attributes.name,
    status: data.attributes.status,
    category: data.attributes.publicationDemographic
  };
}

const MangaPage = (props: Props) => {
  const [results, setResults] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchMangaInformation = async () => {
      const mangaInformation = await getMangaInformation(id);
      setResults(mangaInformation);
      console.log(mangaInformation);
    };

    fetchMangaInformation();
  }, []);

  return (
    
    <div className="w-full h-full  pt-[90px] " data-testid="mangaDetails">
      {/* <div className="h-96 blur-xl w-full background-image bg-[url('https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/4d709522-25f5-4ac0-9b6c-3798a223c7ae.jpg')]"> */}
      <div className="container">
        <div className="titles-author">
          <div className="main-title">
            <p className="main-title-p mb-1 font-bold">{results.title}</p>
          </div>
          <div className="alt-title">
            <p className="sm:text-xl">{results.altTitle}</p>
          </div>
          <div className="flex-grow"></div>
          <div className="author-name">
            <p className="text-xs sm:text-base">{results.author}</p>
          </div>
        </div>

        <div className="buttons">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Save
          </button>

          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Download
          </button>
        </div>
        {/* <div className="theme-chips">
          <span>theme 1</span>
          <span>theme 2</span>
          <span>theme 3</span>
          <span>theme 4</span>
        </div> */}
        <div className="manga-cover">
          <img
            src="https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/4d709522-25f5-4ac0-9b6c-3798a223c7ae.jpg"
            alt=""
          />
        </div>
        <div className="stats">
        <span className="flex items-center text-yellow-400"><BiStar />
        <p className="ml-1">{results.rating}</p></span>

          <span className="flex items-center text-orange-400"><BsBookmark />
          <p className="ml-1">{results.saved_count}</p></span>

        </div>
        <div className="resume">
          <p className="" >
            {results.description}
          </p>
        </div>
        <div className="chapter-list"></div>
      </div>
    </div>

    // </div>
  );
};

export default MangaPage;