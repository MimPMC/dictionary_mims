/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import StarIcon from '@mui/icons-material/Star';
import VolumeUpIcon from "@mui/icons-material/VolumeUp"; // Import MUI audio icon
import { Box, List, ListItem, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";
import { useFavorites } from "./FavContext";


//Stjärnknapp som uppdateras beroende på om ordet  finns i favoritlistan. 
const StarButton = ({ isFavorite, onClick }) => {
  return (
    <Button
      type="button"
      size="small"
      color='primary'
      onClick={onClick}
      startIcon={<StarIcon color={isFavorite ? "secondary" : "action"} />}
       sx={{
    fontSize: {
      xs: 9, 
      sm: 12, 
    },
  }}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
};

export default function WordCard({ word }) {
   const { favoriteWords, addFavoriteWord, removeFavoriteWord } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(favoriteWords.includes(word.word));
  if (!word) {
    return null;
  }
   const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteWord(word.word);
    } else {
      addFavoriteWord(word.word);
    }
    setIsFavorite(!isFavorite);
  };

  /* Funktion körs när spela upp ljud knappen klickas på. Den kollar om det finns en ljudfil, och spelar upp i så fall.*/
  const playAudio = (audioUrl) => {
    if (!audioUrl) {
      console.error("No audio URL provided.");
      return;
    }

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

  const audioRef = useRef(null);

  return (
    <Card elevation={4}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word found:
        </Typography>
           <StarButton isFavorite={isFavorite} onClick={toggleFavorite} />
        </Stack>
        
        <Typography variant="h5" gutterBottom>
          {word.word}
        </Typography>
       
         {/* visa endast om fonetitisk skrift eller ljud finns.*/}
        {word.phonetic ? (
          <Stack my={1}>
            <Typography variant="subtitle2" color="primary">
              Pronountiaction:
            </Typography>
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography variant="subtitle2" color="text.secondary">
                {word.phonetic}
              </Typography>
              {/* Ljudknapp som endast syns om en ljudfil existerar.*/}
              {word.phonetics &&
                word.phonetics.length > 0 &&
                word.phonetics[0].audio && (
                  <CardActions>
                    <Button
                      type="button"
                      size="small"
                      onClick={() => playAudio(word.phonetics[0].audio)}
                      startIcon={<VolumeUpIcon />} // Add MUI audio icon
                    >
                      Play Audio
                    </Button>
                  </CardActions>
                )}
            </Stack>
          </Stack>
        ) : null}
        {/* Här mappas först alla olika sorters meningar, därefter alla versioner som finns i varje ords mening.*/}
        <Box sx={{ mb: 1.5 }} color="text.secondary">
          {word.meanings.map((meaning, index) => (
            <React.Fragment key={index}>
              <Typography variant="subtitle1" color="primary">
                {meaning.partOfSpeech.charAt(0).toUpperCase() +
                  meaning.partOfSpeech.slice(1)}
              </Typography>
              <List>
                {meaning.definitions.map((definition, i) => (
                  <ListItem key={i}>
                    <Typography variant="body2" fontSize={14}>
                      {`${i + 1}. ${definition.definition}`}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
      {/* Dolt ljudelement som kan spelas upp*/}
      <audio ref={audioRef} style={{ display: "none" }} />
    </Card>
  );
}
