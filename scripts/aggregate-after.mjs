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

const UUID_MAP = Object.fromEntries(
  ID_LIST.map((id) => [id, createId()])
);

const UUID_FLIPPED_MAP = Object.fromEntries(
  Object.entries(UUID_MAP).map(([key, value]) => [
    value,
    key,
  ])
);

const previews = JSON.parse(readFileSync("data/list.json"))
  .filter((item) => ID_LIST.includes(item.id))
  .map((item) => {
    return item.title;
  });

console.log(previews);
