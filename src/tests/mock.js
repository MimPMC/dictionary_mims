//data med liknande struktur som api responsen

export const mockWordData = {
  word: "cellphone",
  phonetic: "/ˈsɛlfəʊn/",
  phonetics: [
    {
      text: "/ˈsɛlfəʊn/",
      audio: "",
    },
    {
      text: "/ˈsɛlfoʊn/",
      audio: "",
    },
  ],
  meanings: [
    {
      partOfSpeech: "noun",
      definitions: [
        {
          definition:
            "A portable, wireless telephone, which changes antenna connections seamlessly during travel from one radio reception cell to another without losing the party-to-party call connection.",
          synonyms: [],
          antonyms: [],
        },
      ],
    },
    {
      partOfSpeech: "verb",
      definitions: [
        {
          definition: "To make a call on a cellphone.",
          synonyms: [],
          antonyms: [],
        },
      ],
    },
  ],
};

export const audioWordData = {
  word: "world",
  phonetic: "/wɝld/",
  phonetics: [
    {
      text: "/wɝld/",
      audio:
        "https://api.dictionaryapi.dev/media/pronunciations/en/world-ca.mp3",
    },
  ],
};
