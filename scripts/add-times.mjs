import {
  readFileSync,
  writeFileSync,
  readdirSync,
} from "fs";

const dir = readdirSync("api/shows");

for (const filename of dir) {
  const file = JSON.parse(
    readFileSync(`api/shows/${filename}`, "utf8")
  );

  const { seasons } = file;

  const newSeasons = seasons.map((season) => {
    let isMatch = false;

    const { episodes } = season;

    const newEpisodes = episodes.map((inner) => {
      return {
        ...inner,
        duration: 12,
      };
    });

    return { ...season, episodes: newEpisodes };
  });

  const string = JSON.stringify(
    { ...file, seasons: newSeasons },
    null,
    2
  );

  writeFileSync(`api/shows/${filename}`, string, "utf8");
}
