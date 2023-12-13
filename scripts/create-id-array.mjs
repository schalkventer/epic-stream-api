import { readFileSync, writeFileSync } from "fs";

const data = readFileSync("./data/list.json", "utf8");
const result = JSON.parse(data).map((item) => item.id);

writeFileSync(
  "./data/id-array.json",
  JSON.stringify(result, null, 2)
);
