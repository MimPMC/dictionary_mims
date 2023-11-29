import { Container, Paper, Stack } from "@mui/material";
import { useSearch } from "./SearchContext";
import { MySearchBar } from "./Searchbar";
import WordCard from "./WordCard";


export default function ContentBox() {
  const { searchTerm, foundWord } = useSearch();
  return (
    <Container sx={{ my: 2 }}>
      <Paper width="100%" elevation={1} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stack p={2} spacing={1}>
          <MySearchBar />
             {searchTerm === foundWord?.word ? (
            <WordCard word={foundWord} />
          ) : null}
        </Stack>
      </Paper>
    </Container>
  );
}