import * as React from "react";
import { createGlobalStyle } from "styled-components";

import { Style } from "../../style";
import Input from "../Input";
import { StyledApp, Dialog, Header } from "./style";
import { Range } from "../../models/range";
import { parseRange } from "../../utils/parse-range";

const MathJax = require("react-mathjax").default;

const GlobalStyle = createGlobalStyle`${Style}`;

const tex1 = `A = \\langle 0, 10 \\rangle`;
const tex2 = `B = (5, 8 \\rangle`;

interface State {
  setA: string;
  setB: string;
}

export const getRandomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomBool = () => {
  return getRandomBetween(0, 1) === 1 ? true : false;
};

const generateSet = () => {
  const leftOpen = getRandomBool();
  const rightOpen = getRandomBool();
  const useInfLeft = getRandomBool();

  let range: Range;

  if (useInfLeft) {
    const end = getRandomBetween(-10, 10);
    range = new Range(Number.NEGATIVE_INFINITY, end, false, rightOpen);
  } else {
    const useInfRight = getRandomBool();

    if (useInfRight) {
      const start = getRandomBetween(-10, 10);
      range = new Range(start, Number.POSITIVE_INFINITY, leftOpen, false);
    } else {
      const start = getRandomBetween(-9, 9);
      let end = getRandomBetween(-10, 10);

      while (end < start) {
        end = getRandomBetween(-10, 10);
      }
      range = new Range(start, end, leftOpen, rightOpen);
    }
  }

  return { text: range.toString(), range };
};

export default class App extends React.Component<{}, State> {
  private sumInputRef = React.createRef<Input>();
  private commonInputRef = React.createRef<Input>();
  private aWithoutInputRef = React.createRef<Input>();
  private bWithoutInputRef = React.createRef<Input>();

  private rangeA: Range;
  private rangeB: Range;

  public state: State = {
    setA: "",
    setB: ""
  };

  public componentDidMount() {
    const setA = generateSet();
    const setB = generateSet();

    this.rangeA = setA.range;
    this.rangeB = setB.range;

    this.setState({
      setA: setA.text,
      setB: setB.text
    });
  }

  public onCheckClick = () => {
    const test1 = this.rangeA.sum(this.rangeB);
    const test2 = this.rangeA.commonPart(this.rangeB);
    const test3 = this.rangeA.without(this.rangeB);
    const test4 = this.rangeB.without(this.rangeA);

    const range2 = [parseRange(this.commonInputRef.current.getValue())];
    console.log(
      test1
        .map(res =>
          res
            .toString()
            .replace("\\rangle", ">")
            .replace("\\langle", "<")
            .replace("\\infty", "∞")
        )
        .join(" u ")
    );
    console.log(
      test2
        .toString()
        .replace("\\rangle", ">")
        .replace("\\langle", "<")
        .replace("\\infty", "∞")
    );
    console.log(
      test3
        .map(res =>
          res
            .toString()
            .replace("\\rangle", ">")
            .replace("\\langle", "<")
            .replace("\\infty", "∞")
        )
        .join(" u ")
    );
    console.log(
      test4
        .map(res =>
          res
            .toString()
            .replace("\\rangle", ">")
            .replace("\\langle", "<")
            .replace("\\infty", "∞")
        )
        .join(" u ")
    );
  };

  public render() {
    return (
      <MathJax.Provider>
        <StyledApp>
          <GlobalStyle />
          <Dialog>
            <Header>Online sets test</Header>
            <MathJax.Node formula={`A = ${this.state.setA}`} inline />
            &nbsp;&nbsp;&nbsp;
            <MathJax.Node formula={`B = ${this.state.setB}`} inline />
            <Input ref={this.sumInputRef} formula={`A \\cup B`} />
            <Input ref={this.commonInputRef} formula={`A \\cap B`} />
            <Input ref={this.aWithoutInputRef} formula={`A \\setminus B`} />
            <Input ref={this.bWithoutInputRef} formula={`B \\setminus A`} />
            <button onClick={this.onCheckClick}>Check</button>
          </Dialog>
        </StyledApp>
      </MathJax.Provider>
    );
  }
}
