/* eslint-disable react/prop-types */
import VolumeUpIcon from "@mui/icons-material/VolumeUp"; // Import MUI audio icon
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useRef } from "react";

export default function WordCard({ word }) {
  // Check if searchTerm exists before accessing its properties
  if (!word) {
    return null;
  }
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
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word found:
        </Typography>
        <Typography variant="h5" component="div">
          {word.word}
        </Typography>
        {word.phonetics && word.phonetics.length > 0 && word.phonetics[0].audio && (
          <CardActions>
            <Button
              size="small"
              onClick={() => playAudio(word.phonetics[0].audio)}
              startIcon={<VolumeUpIcon />} // Add MUI audio icon
            >
              Play Audio
            </Button>
          </CardActions>
        )}
        <Box sx={{ mb: 1.5 }} color="text.secondary">
          {word.meanings.map((meaning, index) => (
            <React.Fragment key={index}>
              <Typography variant="subtitle1">
                {meaning.partOfSpeech}
              </Typography>
              <ul>
                {meaning.definitions.map((definition, i) => (
                  <li key={i}>
                    <Typography variant="body2">
                      {`${i + 1}. ${definition.definition}`}
                    </Typography>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: "none" }} />
    </Card>
  );
}