import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import PhotoList from "./components/PhotoList.jsx";
import EnlargedPhoto from "./components/EnlargedPhoto.jsx";
import "./index.css";
import axios from "axios";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [enlargedPhoto, setEnlargedPhoto] = useState(null);
  const [activateSearch, setActivateSearch] = useState(false);

  const fetchData = async ({ query, category }) => {
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

    // If you have a query and/or category, search for both
    if (query || category) {
      let searchQuery = query;

      // Combina query com category se ambas existirem
      if (query && category) {
        searchQuery = `${query} ${category}`;
      } else if (category) {
        searchQuery = category;
      }

      const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: searchQuery,
              client_id: apiKey,
            },
          }
        );
        
        setPhotos(response.data.results);
      return;
    }

    // If there is neither query nor category, search for random photos
      const response = await axios.get(
        `https://api.unsplash.com/photos/random`,
        {
          params: {
            client_id: apiKey,
            count: 12,
          },
        }
      );
      setPhotos(response.data);
  };

  useEffect(() => {
    fetchData({ query, category });
  }, []);

  useEffect(() => {
    if (activateSearch) {
      fetchData({ query, category });
      setActivateSearch(false); // Reset após a busca
    }
  }, [activateSearch]);

  return (
    <div className="container">
      <SearchBar
        setQuery={setQuery}
        setCategory={setCategory}
        setActivateSearch={setActivateSearch}
      />
      <PhotoList 
      photos={photos} 
      setEnlargedPhoto={setEnlargedPhoto} 
      />
      {enlargedPhoto && (
        <EnlargedPhoto 
        photo={enlargedPhoto} 
        setEnlargedPhoto={setEnlargedPhoto} />
      )}
    </div>
  );
};

export default App;