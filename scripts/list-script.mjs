import puppeteer from "puppeteer";
import { writeFileSync } from "fs";

const init = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://www.imdb.com/chart/toptv");

  await page.waitForSelector(
    '.ipc-metadata-list.ipc-metadata-list--dividers-between.sc-71ed9118-0.kxsUNk.compact-list-view.ipc-metadata-list--base[role="presentation"]'
  );

  await page.click("#list-view-option-detailed");

  const result = await page.evaluate(() => {
    const container = document.querySelector(
      '.ipc-metadata-list.ipc-metadata-list--dividers-between.detailed-list-view.ipc-metadata-list--base[role="presentation"]'
    );

    const list = Array.from(
      container.querySelectorAll(
        "li.ipc-metadata-list-summary-item"
      )
    );

    const inner = list.map((inner) => {
      const title = inner
        .querySelector(".ipc-title__text")
        .innerText.replace(/\d*\.\s/, "");

      const description = inner.querySelector(
        ".ipc-html-content-inner-div"
      ).innerText;

      const id = inner
        .querySelector(".ipc-title-link-wrapper")
        .href.replace(
          /https\:\/\/www\.imdb\.com\/title\//,
          ""
        )
        .replace(/\/\?ref_.+/, "");

      const image = inner
        .querySelector(".ipc-image")
        .src.replace(/\._.*_\.jpg$/, ".jpg");

      return { id, description, title, image };
    });

    return inner;
  });

  writeFileSync(
    "./list.json",
    JSON.stringify(result, null, 2)
  );

  await browser.close();
};

init();
