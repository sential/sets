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

    if (range.start < this.end && range.end > this.start) {
      const rangeStart = range.getOriginStart();
      const rangeEnd = range.getOriginEnd();
      const start = this.getOriginStart();
      const end = this.getOriginEnd();

      const leftOpen = rangeStart > start ? range.leftOpen : this.leftOpen;
      const rightOpen = rangeEnd < end ? range.rightOpen : this.rightOpen;

      const result: Range = new Range(
        rangeStart > start ? rangeStart : start,
        rangeEnd < end ? rangeEnd : end,
        leftOpen,
        rightOpen
      );

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
      const rangeStart = range.getOriginStart();
      const rangeEnd = range.getOriginEnd();
      const start = this.getOriginStart();
      const end = this.getOriginEnd();

      const leftOpen = rangeStart < start ? range.leftOpen : this.leftOpen;
      const rightOpen = rangeEnd > end ? range.rightOpen : this.rightOpen;

      const result: Range = new Range(
        rangeStart < start ? rangeStart : start,
        rangeEnd > end ? rangeEnd : end,
        leftOpen,
        rightOpen
      );

      ranges = [result];
    }

    return ranges;
  }

  public without(range: Range) {
    let ranges: Range[] = [];
    const commonPart = this.commonPart(range);

    if (!commonPart[0]) {
      ranges = [this];
    } else if (commonPart[0].toString() === this.toString()) {
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
        !range.leftOpen
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
    const start = this.getOriginStart();
    const end = this.getOriginEnd();

    return `${this.leftOpen ? "\\langle" : "("}${
      start === Number.NEGATIVE_INFINITY ? "-\\infty" : start
    }, ${end === Number.POSITIVE_INFINITY ? "\\infty" : end}${
      this.rightOpen ? "\\rangle" : ")"
    }`;
  };
}
