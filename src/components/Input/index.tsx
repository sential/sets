import * as React from "react";
import { MathInput, CharButton } from "./style";
import TextField from "../TextField";

const MathJax = require("react-mathjax").default;

interface Props {
  formula: string;
  state: "none" | "valid" | "error";
}

export default class Input extends React.Component<Props> {
  private inputRef = React.createRef<TextField>();

  public appendToInput = (char: string) => {
    const { inputElement } = this.inputRef.current;

    const startPos = inputElement.selectionStart;
    const endPos = inputElement.selectionEnd;

    inputElement.value = `${inputElement.value.substring(
      0,
      startPos
    )}${char}${inputElement.value.substring(
      endPos,
      inputElement.value.length
    )}`;

    inputElement.focus();
  };

  public onInfButtonClick = () => {
    this.appendToInput("∞");
  };

  public onSumButtonClick = () => {
    this.appendToInput("∪");
  };

  public onEmptyButtonClick = () => {
    this.appendToInput("Ø");
  };

  public getValue = () => {
    const { inputElement } = this.inputRef.current;
    return inputElement.value;
  };

  public render() {
    const { formula, state } = this.props;

    return (
      <MathInput>
        <MathJax.Node style={{ width: 72 }} formula={`${formula} = `} inline />
        <TextField
          ref={this.inputRef}
          color={
            state === "none"
              ? "#2196F3"
              : state === "valid"
                ? "#4CAF50"
                : "#F44336"
          }
          style={{ marginTop: -7, flex: 1 }}
        />
        <CharButton onClick={this.onInfButtonClick} style={{ marginTop: -7 }}>
          &#8734;
        </CharButton>
        <CharButton
          onClick={this.onSumButtonClick}
          style={{
            marginTop: -7,
            fontSize: 16
          }}
        >
          ∪
        </CharButton>
        <CharButton
          onClick={this.onEmptyButtonClick}
          style={{
            marginTop: -7,
            fontSize: 14
          }}
        >
          Ø
        </CharButton>
      </MathInput>
    );
  }
}
