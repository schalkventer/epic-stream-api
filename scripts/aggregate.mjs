import { v4 as createId } from "uuid";
import { readFileSync, writeFileSync } from "fs";

const ID_LIST = [
  "tt0903747",
  "tt5491994",
  "tt0795176",
  "tt0185906",
  "tt7366338",
  "tt0306414",
  "tt0417299",
  "tt6769208",
  "tt0141842",
  "tt2395695",
  "tt0081846",
  "tt9253866",
  "tt0944947",
  "tt0071075",
  "tt7678620",
  "tt1355642",
  "tt8420184",
  "tt1533395",
  "tt0052520",
  "tt1475582",
  "tt1877514",
  "tt0103359",
  "tt2560140",
  "tt12392504",
  "tt0386676",
  "tt0296310",
  "tt3032476",
  "tt1806234",
  "tt0303461",
  "tt2092588",
  "tt0877057",
  "tt0081912",
  "tt2098220",
  "tt0098769",
  "tt0098904",
  "tt9735318",
  "tt0092337",
  "tt0213338",
  "tt1865718",
  "tt2297757",
  "tt3530232",
  "tt7137906",
  "tt7660850",
  "tt1508238",
  "tt0108778",
  "tt2571774",
  "tt4934214",
  "tt4742876",
  "tt0472954",
  "tt0063929",
  "tt0200276",
  "tt0081834",
  "tt0264235",
  "tt0388629",
  "tt0072500",
  "tt3398228",
  "tt0112130",
  "tt0193676",
  "tt0096548",
  "tt0098936",
  "tt0214341",
  "tt2707408",
  "tt0353049",
  "tt0121220",
  "tt13309742",
  "tt2085059",
  "tt0074006",
];

const GENRES_MAP = {
  "Breaking Bad": ["Crime", "Drama", "Thriller"],
  "Planet Earth II": ["Documentary", "Nature"],
  "Planet Earth": ["Documentary", "Nature"],
  "Band of Brothers": ["Drama", "War", "History"],
  Chernobyl: ["Drama", "History", "Thriller"],
  "The Wire": ["Crime", "Drama", "Thriller"],
  "Avatar: The Last Airbender": [
    "Animation",
    "Action",
    "Adventure",
  ],
  "Blue Planet II": ["Documentary", "Nature"],
  "The Sopranos": ["Crime", "Drama"],
  "Cosmos: A Spacetime Odyssey": ["Documentary", "Science"],
  Cosmos: ["Documentary", "Science"],
  "Our Planet": ["Documentary", "Nature"],
  "Game of Thrones": ["Action", "Adventure", "Drama"],
  "The World at War": ["Documentary", "History", "War"],
  Bluey: ["Animation", "Family"],
  "Fullmetal Alchemist: Brotherhood": [
    "Animation",
    "Action",
    "Adventure",
  ],
  "The Last Dance": ["Documentary", "Biography", "Sport"],
  Life: ["Documentary", "Nature"],
  "The Twilight Zone": ["Drama", "Fantasy", "Horror"],
  Sherlock: ["Crime", "Drama", "Mystery"],
  "The Vietnam War": ["Documentary", "History", "War"],
  "Batman: The Animated Series": [
    "Animation",
    "Action",
    "Adventure",
  ],
  "Attack on Titan": ["Animation", "Action", "Drama"],
  "Scam 1992: The Harshad Mehta Story": [
    "Biography",
    "Crime",
    "Drama",
  ],
  "The Office": ["Comedy"],
  "The Blue Planet": ["Documentary", "Nature"],
  "Better Call Saul": ["Crime", "Drama"],
  "Human Planet": ["Documentary", "Nature"],
  Firefly: ["Adventure", "Drama", "Sci-Fi"],
  "Frozen Planet": ["Documentary", "Nature"],
  "Death Note": ["Animation", "Crime", "Drama"],
  "Only Fools and Horses": ["Comedy"],
  "Hunter x Hunter": ["Animation", "Action", "Adventure"],
  "The Civil War": ["Documentary", "History", "War"],
  Seinfeld: ["Comedy"],
  "The Beatles: Get Back": ["Documentary", "Music"],
  "The Decalogue": ["Drama"],
  "Cowboy Bebop": ["Animation", "Action", "Adventure"],
  "Gravity Falls": ["Animation", "Adventure", "Comedy"],
  "Nathan for You": ["Comedy", "Documentary"],
  "Last Week Tonight with John Oliver": [
    "Comedy",
    "News",
    "Talk-Show",
  ],
  "When They See Us": ["Biography", "Crime", "Drama"],
  Succession: ["Drama"],
  "Apocalypse: The Second World War": [
    "Documentary",
    "History",
    "War",
  ],
  Friends: ["Comedy", "Romance"],
  Africa: ["Documentary", "Nature"],
  Taskmaster: ["Comedy", "Game-Show"],
  "TVF Pitchers": ["Drama"],
  "It's Always Sunny in Philadelphia": ["Comedy"],
  "Monty Python's Flying Circus": ["Comedy"],
  "The West Wing": ["Drama"],
  "Das Boot": ["Drama", "War"],
  "Curb Your Enthusiasm": ["Comedy"],
  "One Piece": ["Animation", "Action", "Adventure"],
  "Fawlty Towers": ["Comedy"],
  "BoJack Horseman": ["Animation", "Comedy", "Drama"],
  "Pride and Prejudice": ["Drama", "Romance"],
  "Freaks and Geeks": ["Comedy", "Drama"],
  "Blackadder Goes Forth": ["Comedy", "History"],
  "Twin Peaks": ["Crime", "Drama", "Mystery"],
  "Dragon Ball Z": ["Animation", "Action", "Adventure"],
  Narcos: ["Biography", "Crime", "Drama"],
  "Chappelle's Show": ["Comedy", "Music"],
  "Blue Eye Samurai": ["Animation", "Action", "Adventure"],
  "Black Mirror": ["Drama", "Sci-Fi", "Thriller"],
  "I, Claudius": ["Biography", "Drama", "History"],
};

const GENRES = [
  "Crime",
  "Drama",
  "Thriller",
  "Documentary",
  "Nature",
  "War",
  "History",
  "Animation",
  "Action",
  "Adventure",
  "Science",
  "Family",
  "Biography",
  "Sport",
  "Fantasy",
  "Horror",
  "Mystery",
  "Comedy",
  "Sci-Fi",
  "Music",
  "News",
  "Talk Show",
  "Romance",
  "Game Show",
];

const UUID_MAP = Object.fromEntries(
  ID_LIST.map((id) => [id, createId()])
);

const UUID_FLIPPED_MAP = Object.fromEntries(
  Object.entries(UUID_MAP).map(([key, value]) => [
    value,
    key,
  ])
);

let previews = JSON.parse(readFileSync("data/list.json"))
  .filter((item) => ID_LIST.includes(item.id))
  .map((item) => {
    const rawGenres = GENRES_MAP[item.title];

    const genres = rawGenres.map(
      (inner) => GENRES.indexOf(inner) + 1
    );

    return {
      ...item,
      id: UUID_MAP[item.id],
      genres,
    };
  });

for (let item of previews) {
  const full = JSON.parse(
    readFileSync(`data/${UUID_FLIPPED_MAP[item.id]}.json`)
  );

  let seasons = [];

  for (let singleEpisode of full.episodes) {
    const {
      title,
      season,
      episode,
      description,
      date,
      image,
    } = singleEpisode;

    const existing = seasons[season - 1] || {
      id: createId(),
      season: season,
      episodes: [],
    };

    seasons[season - 1] = {
      ...existing,
      episodes: [
        ...existing.episodes,
        {
          id: createId(),
          title,
          episode,
          description,
          date,
          image,
          file: "https://epic-stream-api.netlify.app/placeholder.mp4",
        },
      ],
    };

    const result = {
      ...item,
      seasons,
    };

    previews.find((inner) => inner.id === item.id).seasons =
      seasons.length;

    writeFileSync(
      `data/final/shows/${item.id}.json`,
      JSON.stringify(result, null, 2)
    );
  }

  writeFileSync(
    `data/final/list.json`,
    JSON.stringify(previews, null, 2)
  );
}
