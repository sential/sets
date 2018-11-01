export class Range {
  public start: number;
  public end: number;

  constructor(start: number = 0, end: number = 0) {
    this.start = start;
    this.end = end;
  }

  public contains(range: Range) {
    if (range.start > this.start && range.end < this.end) {
      return true;
    }

    return false;
  }

  public sum(range: Range) {
    let ranges: Range[] = [];

    if (range.start > this.end) {
      ranges = [this, range];
    } else if (range.end < this.start) {
      ranges = [this, range];
    } else {
      const result: Range = new Range(this.start, this.end);

      if (range.start < this.start) {
        result.start = range.start;
      }
      if (range.end > this.end) {
        result.end = range.end;
      }

      ranges = [result];
    }

    return ranges;
  }
}
