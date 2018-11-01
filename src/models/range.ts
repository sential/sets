export class Range {
  public start: number;
  public end: number;
  public leftOpen: boolean;
  public rightOpen: boolean;

  constructor(start = 0, end = 0, leftOpen = false, rightOpen = false) {
    this.start = start;
    this.end = end;
    this.leftOpen = leftOpen;
    this.rightOpen = rightOpen;

    if (!this.leftOpen) {
      this.start++;
    }
    if (!this.rightOpen) {
      this.end--;
    }
  }

  public commonPart(range: Range) {
    let ranges: Range[] = [];

    if (range.start < this.end) {
      const result: Range = new Range(
        this.start,
        this.end,
        this.leftOpen,
        this.rightOpen
      );

      if (range.start > this.start) {
        result.start = range.start;
        result.leftOpen = range.leftOpen;
      }
      if (range.end < this.end) {
        result.end = range.end;
        result.rightOpen = range.rightOpen;
      }

      ranges = [result];
    }

    return ranges;
  }

  public getOriginStart() {
    return this.leftOpen ? this.start : this.start - 1;
  }

  public getOriginEnd() {
    return this.rightOpen ? this.end : this.end + 1;
  }

  public sum(range: Range) {
    let ranges: Range[] = [];

    if (range.start > this.end) {
      ranges = [this, range];
    } else if (range.end < this.start) {
      ranges = [this, range];
    } else {
      const result: Range = new Range(
        this.start,
        this.end,
        this.leftOpen,
        this.rightOpen
      );

      if (range.start < this.start) {
        result.start = range.start;
        result.leftOpen = range.leftOpen;
      }
      if (range.end > this.end) {
        result.end = range.end;
        result.rightOpen = range.rightOpen;
      }

      ranges = [result];
    }

    return ranges;
  }

  public without(range: Range) {
    let ranges: Range[] = [];

    if (range.start <= this.start && range.end >= this.end) {
      ranges = [];
    } else if (range.start <= this.start && range.end < this.end) {
      const result = new Range(
        range.getOriginEnd(),
        this.getOriginEnd(),
        !range.leftOpen,
        this.leftOpen
      );
      ranges = [result];
    } else if (range.start > this.start && range.end >= this.end) {
      const result = new Range(
        this.getOriginStart(),
        range.getOriginStart(),
        this.leftOpen,
        !range.leftOpen
      );
      ranges = [result];
    } else if (range.start > this.start && range.end < this.end) {
      const result1 = new Range(
        this.getOriginStart(),
        range.getOriginStart(),
        this.leftOpen,
        range.rightOpen
      );

      const result2 = new Range(
        range.getOriginEnd(),
        this.getOriginEnd(),
        !range.rightOpen,
        this.rightOpen
      );

      ranges = [result1, result2];
    }

    return ranges;
  }

  public toString = () => {
    return `${
      this.leftOpen ? "<" : "("
    }${this.getOriginStart()}, ${this.getOriginEnd()}${
      this.rightOpen ? ">" : ")"
    }`;
  };
}
