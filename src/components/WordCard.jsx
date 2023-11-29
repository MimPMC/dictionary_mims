/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import VolumeUpIcon from "@mui/icons-material/VolumeUp"; // Import MUI audio icon
import { Box, List, ListItem, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useRef } from "react";

export default function WordCard({ word }) {
  // Kollar så att det finns ett ord att visa
  if (!word) {
    return null;
  }

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
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word found:
        </Typography>
        <Typography variant="h5">{word.word}</Typography>
        <Stack direction="row" spacing={3} alignItems="center">
          {word.phonetic ? (
            <Typography variant="subtitle2" color="text.secondary">
              {word.phonetic}
            </Typography>
          ) : null}
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
        {/* Här mappas först alla olika sorters meningar, därefter alla versioner som finns i varje ords mening.*/}
        <Box sx={{ mb: 1.5 }} color="text.secondary">
          {word.meanings.map((meaning, index) => (
            <React.Fragment key={index}>
              <Typography variant="subtitle1">
                {meaning.partOfSpeech}
              </Typography>
              <List>
                {meaning.definitions.map((definition, i) => (
                  <ListItem key={i}>
                    <Typography variant="body2">
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
