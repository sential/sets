import * as React from "react";
import { createGlobalStyle } from "styled-components";

import { Style } from "../../style";
import Input from "../Input";
import { StyledApp, Dialog, Header } from "./style";
import { Range } from "../../models/range";
import { parseRange } from "../../utils/parse-range";
import Button from "../Button";
import { colors } from "../../constants";

const MathJax = require("react-mathjax").default;

const GlobalStyle = createGlobalStyle`${Style}`;

interface State {
  setA: string;
  setB: string;
  input1State: "none" | "valid" | "error";
  input2State: "none" | "valid" | "error";
  input3State: "none" | "valid" | "error";
  input4State: "none" | "valid" | "error";
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

const getResultString = (ranges: any[]) => {
  if (ranges.length === 0) return "Ø";

  return ranges
    .map(res =>
      res
        .toString()
        .replace("\\rangle", ">")
        .replace("\\langle", "<")
        .replace(/\\infty/g, "∞")
        .replace("u", "∪")
    )
    .join("∪")
    .replace(/ /g, "");
};

const getInputString = (str: string) => {
  return getResultString(str.split("∪").map((item: any) => parseRange(item)));
};

export default class App extends React.Component<{}, State> {
  private inputRef1 = React.createRef<Input>();
  private inputRef2 = React.createRef<Input>();
  private inputRef3 = React.createRef<Input>();
  private inputRef4 = React.createRef<Input>();

  private rangeA: Range;
  private rangeB: Range;

  public state: State = {
    setA: "",
    setB: "",
    input1State: "none",
    input2State: "none",
    input3State: "none",
    input4State: "none"
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
    const test1 = getResultString(this.rangeA.sum(this.rangeB));
    const test2 = getResultString(this.rangeA.commonPart(this.rangeB));
    const test3 = getResultString(this.rangeA.without(this.rangeB));
    const test4 = getResultString(this.rangeB.without(this.rangeA));

    const input1 = getInputString(this.inputRef1.current.getValue());
    const input2 = getInputString(this.inputRef2.current.getValue());
    const input3 = getInputString(this.inputRef3.current.getValue());
    const input4 = getInputString(this.inputRef4.current.getValue());

    this.setState({
      input1State: test1 === input1 ? "valid" : "error",
      input2State: test2 === input2 ? "valid" : "error",
      input3State: test3 === input3 ? "valid" : "error",
      input4State: test4 === input4 ? "valid" : "error"
    });
    /*console.log(test1, input1);
    console.log(test2, input2);
    console.log(test3, input3);
    console.log(test4, input4);*/
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
            <Input
              ref={this.inputRef1}
              formula={`A \\cup B`}
              state={this.state.input1State}
            />
            <Input
              ref={this.inputRef2}
              formula={`A \\cap B`}
              state={this.state.input2State}
            />
            <Input
              ref={this.inputRef3}
              formula={`A \\setminus B`}
              state={this.state.input3State}
            />
            <Input
              ref={this.inputRef4}
              formula={`B \\setminus A`}
              state={this.state.input4State}
            />
            <Button
              style={{ float: "right", marginTop: 16 }}
              onClick={this.onCheckClick}
              background={colors.blue["500"]}
            >
              Check
            </Button>
          </Dialog>
        </StyledApp>
      </MathJax.Provider>
    );
  }
}
