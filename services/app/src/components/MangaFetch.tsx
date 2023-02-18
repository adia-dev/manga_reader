import React, { useState, useEffect } from "react";
import axios from "axios";



type Props = {}


const MangaFetch: React.FC = (props: Props) => {

    const [results, setResults] = useState<number[] | null>(null);

    const handleSubmit = async () => {
      try {
        const response = await axios.get(
          `https://api.mangadex.org/manga?order[createdAt]=desc&limit=3`,
          {}
        );
  
        setResults(response.data.data.map((manga: any) => manga.attributes.title.en));

      } catch (error) {
        console.error(error);
        alert("Error with the request.");
      }
    };

    useEffect(() => {
      handleSubmit();
      
    }, []);
    return (
      <>
        
        {results && (
          <ul>
            {results.map((title) => (

              <li className='text-white' key={title}><img src="https://uploads.mangadex.org/covers/504cb09b-6f5d-4a2c-a363-6de16f8d96cc/51ebaf79-7c48-4b70-8303-a4d7a40e7887.jpg" alt='manga' className='h-52' />{title}</li>
            ))}
          </ul>
        )}
        <button value="Click me" />;

      </>
    );
  };
  

export default MangaFetch;



