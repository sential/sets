import { Range } from "../models/range";

export const parseRange = (str: string) => {
  const params = str
    .substring(1, str.length - 1)
    .split(",")
    .map(param => {
      if (param === "-∞") return Number.NEGATIVE_INFINITY;
      if (param === "∞") return Number.POSITIVE_INFINITY;
      return parseInt(param, 10);
    });

  const range = new Range(
    params[0],
    params[1],
    str.startsWith("<"),
    str.endsWith(">")
  );

  return range;
};
