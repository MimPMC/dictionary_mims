import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";
import { SearchProvider } from "../components/SearchContext";
import { MySearchBar } from "../components/Searchbar";
import { audioWordData, mockWordData } from "./mock";

describe("Search function", () => {

  // Testet kollar att sökfältet och sökknappen finns, samt att sökfältet får rätt värde när du skriver i det. 
  it("Check if you can search for a word", async () => {
    render(
      <SearchProvider>
        <MySearchBar />
      </SearchProvider>
    );
    const user = userEvent.setup();
    const searchField = screen.getByPlaceholderText("Search for a word...");
    await user.click(screen.getByRole("textbox"));
    await user.type(searchField, "hello");
    expect(searchField).toHaveValue("hello");
  });

  // Testet kollar att sökfältet visar korrekt error om du söker utan att skriva någonting.  
  it("Check if searching with empty searchfield displays correct error", async () => {
    render(
      <SearchProvider>
        <MySearchBar />
      </SearchProvider>
    );

    // Simulera ett knapptryck.
    await userEvent.click(screen.getByRole("button"));

    // Kollar att errormeddelande finns.
    expect(
      await screen.findByText("Please enter a search term.")
    ).toBeInTheDocument();
  });

  // Testet kollar att sökfältet visar korrekt error om du söker på något ord som er finns.  
  it("Check if searching something that doesnt exist doesnt work", async () => {
    render(
      <SearchProvider>
        <MySearchBar />
      </SearchProvider>
    );
    const searchField = screen.getByPlaceholderText("Search for a word...");
    const searchButton = screen.getByLabelText("search");
    const searchTerm = "xghshshshshh"
    await userEvent.type(searchField, searchTerm);
    await userEvent.click(searchButton);

    expect(
      await screen.findByText("No definitions found for 'xghshshshshh'.")
    ).toBeInTheDocument();
  });

  // Testet kollar att du kan söka efter ett ord och att informationen visas för användaren. 
  it("Check if user can search for a word and results show up in WordCard component", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );

    const searchField = screen.getByPlaceholderText("Search for a word...");
    const searchButton = screen.getByLabelText("search");
    await userEvent.type(searchField, mockWordData.word);
    await userEvent.click(searchButton);

    //Kollar att ordet vi sökte på visas, med lite beskriviningar som tillhör ordet.

    await waitFor(() => {
      const wordCard = screen.getByText(mockWordData.word);
      expect(wordCard).toBeInTheDocument();
      expect(screen.getByText(mockWordData.phonetic)).toBeInTheDocument();
      expect(screen.getByText("noun")).toBeInTheDocument();
      expect(
        screen.getByText(
          "1. A portable, wireless telephone, which changes antenna connections seamlessly during travel from one radio reception cell to another without losing the party-to-party call connection."
        )
      ).toBeInTheDocument();
    });
    // Kollar att ljudelement ej existerar om ljud ej finns. 
    const playAudioButton = screen.queryByText("Play Audio");
    const audioFile = screen.queryByRole("audio");
    expect(playAudioButton, audioFile).toBeNull();
  });

   it("Check if user can search for a word with audio ", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );

    const searchField = screen.getByPlaceholderText("Search for a word...");
    const searchButton = screen.getByLabelText("search");
    await userEvent.type(searchField, audioWordData.word);
    await userEvent.click(searchButton);

    // Kollar att ljudelement existerar om ljudfil finns. 
    await waitFor(() => {
      const playAudioButton = screen.getByText("Play Audio");
      const audioFile = screen.findByRole("audio");
      expect(playAudioButton, audioFile).toBeInTheDocument();
    });
    
  });
});
