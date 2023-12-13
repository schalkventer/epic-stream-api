import puppeteer from "puppeteer";
import { writeFileSync } from "fs";

const ID_LIST = [
  // "tt0903747",
  // "tt5491994",
  // "tt0795176",
  // "tt0185906",
  // "tt7366338",
  // "tt0306414",
  // "tt0417299",
  // "tt6769208",
  // "tt0141842",
  // "tt2395695",
  // "tt0081846",
  // "tt9253866",
  // "tt0944947",
  // "tt0071075",
  // "tt7678620",

  // "tt2861424", TO FIX

  // "tt1355642",
  // "tt8420184",
  // "tt1533395",
  // "tt0052520",
  // "tt1475582",
  // "tt1877514",
  // "tt0103359",
  // "tt2560140",
  // "tt12392504",
  // "tt0386676",

  // "tt11126994", TO FIX

  // "tt0296310",
  // "tt3032476",
  // "tt1806234",
  // "tt0303461",
  // "tt2092588",

  // "tt10541088", TO FIX

  // "tt0877057",
  // "tt0081912",
  // "tt2098220",
  // "tt0098769",

  // "tt2356777", TO FIX

  // "tt0098904",
  // "tt9735318",
  // "tt0092337",

  // "tt7920978", TO FIX
  // "tt2802850", TO FIX

  // "tt0213338",
  // "tt1865718",
  // "tt2297757",
  // "tt3530232",
  // "tt7137906",
  // "tt7660850",
  // "tt1508238",
  // "tt0108778",
  // "tt2571774",
  // "tt4934214",
  // "tt4742876",
  // "tt0472954",

  // "tt13675832", TO FIX

  // "tt0063929",
  // "tt0200276",
  // "tt0081834",
  // "tt0264235",
  // "tt0388629",
  // "tt0072500",

  // "tt1831164", TO FIX

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

const init = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  for await (const ID of ID_LIST) {
    await page.goto(
      `https://www.imdb.com/title/${ID}/episodes?season=1`
    );

    await page.waitForSelector(
      "section.ipc-page-section.ipc-page-section--base .episode-item-wrapper"
    );

    let { episodes, seasons } = await page.evaluate(() => {
      const seasonsList = Array.from(
        document.querySelectorAll(
          '[data-testid="tab-season-entry"]'
        )
      );

      const seasons =
        seasonsList && seasonsList.length > 0
          ? Number(seasonsList.at(-1).innerText)
          : 1;

      const list = Array.from(
        document.querySelectorAll(
          "section.ipc-page-section.ipc-page-section--base .episode-item-wrapper"
        )
      );

      const episodes = list.map((inner) => {
        const text = inner.querySelector(
          ".ipc-title__text"
        ).innerText;

        const title = text.replace(/^S\d\.E\d\s.\s/im, "");

        const season = Number(
          text.replace(/^S/im, "").replace(/\.E\d.+/im, "")
        );

        const episode = Number(
          text
            .replace(/^S\d\.E/im, "")
            .replace(/\s.\s.+/im, "")
        );

        const description = inner.querySelector(
          ".ipc-html-content-inner-div"
        ).innerText;

        const date = new Date(
          inner.querySelector(
            ".sc-9115db22-10.fyHWhz"
          ).innerText
        ).toISOString();

        const image = inner
          .querySelector(".ipc-image")
          .src.replace(/\.\_.+_\.jpg/im, ".jpg");

        return {
          title,
          season,
          episode,
          description,
          date,
          image,
        };
      });

      return { seasons, episodes };
    });

    if (seasons > 1) {
      const seasonsArray = new Array(seasons - 1)
        .fill(0)
        .map((_, i) => i + 2);

      for await (const seasonNumber of seasonsArray) {
        try {
          await page.goto(
            `https://www.imdb.com/title/${ID}/episodes/?season=${seasonNumber}`
          );

          await page.waitForSelector(
            "section.ipc-page-section.ipc-page-section--base .episode-item-wrapper"
          );

          const newEpisodes = await page.evaluate(() => {
            const innerList = Array.from(
              document.querySelectorAll(
                "section.ipc-page-section.ipc-page-section--base .episode-item-wrapper"
              )
            );

            const innerResponse = innerList.map((inner) => {
              const text = inner.querySelector(
                ".ipc-title__text"
              ).innerText;

              const title = text.replace(
                /^S\d\d?\.E\d\d?\s.\s/im,
                ""
              );

              const season = Number(
                text
                  .replace(/^S/im, "")
                  .replace(/\.E\d\d?.+/im, "")
              );

              const episode = Number(
                text
                  .replace(/^S\d\d?\.E/im, "")
                  .replace(/\s.\s.+/im, "")
              );

              const description = inner.querySelector(
                ".ipc-html-content-inner-div"
              ).innerText;

              const date = new Date(
                inner.querySelector(
                  ".sc-9115db22-10.fyHWhz"
                ).innerText
              ).toISOString();

              const image = inner
                .querySelector(".ipc-image")
                .src.replace(/\.\_.+_\.jpg/im, ".jpg");

              return {
                title,
                season,
                episode,
                description,
                date,
                image,
              };
            });

            return innerResponse;
          });

          episodes = [...episodes, ...newEpisodes];
        } catch (error) {
          console.log(
            `https://www.imdb.com/title/${ID}/episodes/?season=${seasonNumber}`
          );
          console.error(error);
        }
      }
    }

    writeFileSync(
      `./data/${ID}.json`,
      JSON.stringify({ seasons, episodes }, null, 2)
    );
  }

  await browser.close();
};

init();
