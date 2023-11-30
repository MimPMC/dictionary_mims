/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/UseLocalStorage";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteWords, setFavoriteWords] = useLocalStorageState([],"fav");

  const addFavoriteWord = (word) => {
    setFavoriteWords((prevWords) => [...prevWords, word]);
  };

  const removeFavoriteWord = (word) => {
    setFavoriteWords((prevWords) => prevWords.filter((w) => w !== word));
  };

  const contextValue = {
    favoriteWords,
    addFavoriteWord,
    removeFavoriteWord,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};