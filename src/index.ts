import "./styles/app.scss";

import { Range } from "./models/range";
import { parseRange } from "./utils/parse-range";

declare const window: any;

window.arrayToString = (arr: any) => {
  let str = "";

  for (const a of arr) {
    str += `${a.toString()} `;
  }

  return str;
};

window.parseRange = parseRange;
