/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
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
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};