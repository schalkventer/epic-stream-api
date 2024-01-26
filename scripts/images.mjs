import { readFileSync, writeFileSync } from "fs";
import sharp from "sharp";
import fetch from "node-fetch";

const list = JSON.parse(readFileSync("api/list.json"));
// console.log(list.length);

// list.forEach(async ({ image: url, id }) => {
//   const image = await fetch(url);
//   const imageBuffer = await image.buffer();

//   await sharp(imageBuffer)
//     .resize(19 * 16, 27 * 16, {
//       fit: "cover",
//     })
//     .toFile(`assets/shows/${id}.jpg`);
// });

const newList = list.map((inner) => {
  return {
    ...inner,
    image: `https://epic-stream-api.netlify.app/assets/shows/${inner.id}.jpg`,
  };
});

writeFileSync(
  "api/new-list.json",
  JSON.stringify(newList, null, 2)
);
