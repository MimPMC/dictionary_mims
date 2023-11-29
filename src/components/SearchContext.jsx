/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

/* I denna context finns två states, ett är sökordet och ett är det hittade ordet.
 Dessa används i bland annat sökfältet och wordcard, 
och kortet visas endast medans de båda är samma värde. */

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundWord, setFoundWord] = useState(null);

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const updateFoundWord = (wordData) => {
    setFoundWord(wordData);
  };

  const contextValue = {
    searchTerm,
    updateSearchTerm,
    foundWord,
    updateFoundWord,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
