/* eslint-disable react/prop-types */
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSearch } from "./SearchContext";

export const MySearchBar = () => {
  const { searchTerm, updateSearchTerm, updateFoundWord } = useSearch();
  const [errorStatus, setErrorStatus] = useState("");

  //Sökfunktionen, triggas när du klickar enter eller på sökikonen.
  const handleSearch = async () => {
    //Om sökfält är tom, visa ett errormeddelande.
    if (!searchTerm.trim()) {
      setErrorStatus("Please enter a search term.");
      return;
    }
    try {
      // Kallar API efter det sökta ordet.
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );
      // Kollar om svaret innehåller ett definition av ett ord.
      if (response.data && response.data.length > 0) {
        setErrorStatus("");

        //Tar datan från det första ordet i responsen
        const wordData = response.data[0];

        // Uppdatera foundWord i contexten.
        updateFoundWord(wordData);
      } else {
        //sätt error att ordet inte hittas
        setErrorStatus(`No definitions found for '${searchTerm}'.`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
       //sätt error att ordet inte hittas
        setErrorStatus(`No definitions found for '${searchTerm}'.`);
      } else {
        // Om något annat går fel visas detta felet.
        setErrorStatus(
          "Error fetching word definitions. Please try again later."
        );
        console.error("Error fetching word definitions:", error.message);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <TextField
        placeholder="Search for a word..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => {
          updateSearchTerm(e.target.value);
          setErrorStatus(""); // Clear error status when the user types
        }}
        error={!!errorStatus}
        helperText={errorStatus}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search" color="primary" type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

