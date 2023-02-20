import React, { useState, setState, useEffect } from "react";
import axios from "axios";

const SearchManga = () => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://api.mangadex.org/manga?title=${title}`,
        {}
      );

      setResults(response.data.data.map((manga) => manga.id));
    } catch (error) {
      console.error(error);
      alert("Error with the request.");
    }
  };

  useEffect(() => {
    handleSubmit(title);
  }, [title]);

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);

          handleSubmit(e);
          console.log(title);
        }}
      />
      <button onClick={handleSubmit}>Search</button>

      {results && (
        <ul>
          {results.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchManga;
