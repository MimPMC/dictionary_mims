/* eslint-disable react/prop-types */
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useSearch } from './SearchContext';

export const MySearchBar = ({ onSearch }) => {
  const { searchTerm, updateSearchTerm, updateFoundWord } = useSearch();
  const [errorStatus, setErrorStatus] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setErrorStatus('Please enter a search term.');
      return;
    }

    try {
      // Make API call to get word definitions
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);

      // Check if the response contains word definitions
      if (response.data && response.data.length > 0) {
        setErrorStatus('');

        // Extract relevant information from the API response
        const wordData = response.data[0]; // Assuming there is only one word in the response

        // Update foundWord in the context
        updateFoundWord(wordData);

        // Perform further actions with the wordData, e.g., update UI
        if (onSearch) {
          onSearch(wordData);
        }
      } else {
        setErrorStatus(`No definitions found for '${searchTerm}'.`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 (Not Found) error, indicating that the word was not found
        setErrorStatus(`No definitions found for '${searchTerm}'.`);
      } else {
        setErrorStatus('Error fetching word definitions. Please try again later.');
        console.error('Error fetching word definitions:', error.message);
      }
    }
  }; // Missing closing parenthesis

  return (
    <TextField
      placeholder="Search for a word..."
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => {
        updateSearchTerm(e.target.value);
        setErrorStatus(''); // Clear error status when the user types
      }}
      error={!!errorStatus}
      helperText={errorStatus}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch} aria-label="search" color="primary">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
