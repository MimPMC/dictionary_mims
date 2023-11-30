import StarIcon from "@mui/icons-material/Star";
import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useFavorites } from "./FavContext";
import { useSearch } from "./SearchContext";

const FavoriteDropdown = () => {
  const { favoriteWords } = useFavorites();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const { updateSearchTerm, updateFoundWord } = useSearch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (word) => {
    // Call the function to perform the request with the clicked word
    updateSearchTerm(word);
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.data && response.data.length > 0) {
        const wordData = response.data[0];

        // Update foundWord in the context
        updateFoundWord(wordData);
      } else {
        // Handle the case when no definitions are found
        updateFoundWord(null);
      }
    } catch (error) {
      // Handle errors, such as network issues or API errors
      console.error("Error fetching word definitions:", error.message);
      updateFoundWord(null);
    }

    // Close the menu
    handleClose();
  };

  return (
    <Stack>
      {isSm ? (
        <Button
          onClick={handleClick}
          startIcon={
            <StarIcon
              sx={{
                color: theme.palette.secondary.main,
              }}
            />
          }
          color="primary"
          size="small"
          sx={{
            color:
              theme.palette.mode === "light"
                ? "white"
                : theme.palette.primary.main,
            borderColor:
              theme.palette.mode === "light"
                ? "white"
                : theme.palette.primary.main,
            fontSize: 12, // Fixed font size for 'md' and larger
          }}
        >
          Favourites
        </Button>
      ) : (
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            color: theme.palette.secondary.main,
            borderColor:
              theme.palette.mode === "light"
                ? "white"
                : theme.palette.primary.main,
            fontSize: 14, // Fixed font size for smaller than 'md'
            display: isSm ? "none" : "block", // Conditional display property
          }}
        >
          <StarIcon />
        </IconButton>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {favoriteWords.length === 0 ? (
          <MenuItem disabled>
            <Typography
              variant="body2"
              sx={{
                fontSize: {
                  xs: 9, // Font size for extra-small screens
                  sm: 14, // Font size for medium screens and larger
                },
              }}
            >
              No favorite words
            </Typography>
          </MenuItem>
        ) : (
          favoriteWords.map((word, index) => (
            <MenuItem key={index} onClick={() => handleMenuItemClick(word)}>
              <ListItemIcon>
                <StarIcon
                  color="primary"
                  sx={{
                    fontSize: isSm ? 18 : 20,
                    color: theme.palette.secondary.main,
                  }}
                />
              </ListItemIcon>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: 12, // Font size for extra-small screens
                    sm: 14, // Font size for medium screens and larger
                  },
                }}
              >
                {word}
              </Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </Stack>
  );
};

export default FavoriteDropdown;