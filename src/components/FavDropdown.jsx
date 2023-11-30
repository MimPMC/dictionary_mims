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

  //Stänga  menyn
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (word) => {
    // uppdatera sökterm till ord du klickat på, sedan hitta det ur api:et. 
    updateSearchTerm(word);
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.data && response.data.length > 0) {
        const wordData = response.data[0];

        // Uppdatera foundwourd i context
        updateFoundWord(wordData);
      } else {
        // om inget ord hittas, sätt det till null.
        updateFoundWord(null);
      }
    } catch (error) {
      console.error("Error fetching word definitions:", error.message);
      updateFoundWord(null);
    }

    // Close the menu
    handleClose();
  };

  return (
    <Stack>
      {/**Visar en ikon på mobil, och textmeny på större skärmar. */}
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

            fontSize: 12,
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
            fontSize: 14,
            display: isSm ? "none" : "block",
          }}
        >
          <StarIcon />
        </IconButton>
      )}
      {/**Menu popup med favoritord, de tas bort/läggs till automatiskt och sparas i localstorage. */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {favoriteWords.length === 0 ? (
          <MenuItem disabled>
            <Typography
              variant="body2"
              sx={{
                fontSize: {
                  xs: 9,
                  sm: 14,
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
                    xs: 12,
                    sm: 14,
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
