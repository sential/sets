import * as React from "react";
import { MathInput, CharButton } from "./style";
import TextField from "../TextField";

const MathJax = require("react-mathjax").default;

interface Props {
  formula: string;
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

  public getValue = () => {
    const { inputElement } = this.inputRef.current;
    return inputElement.value;
  };

  public render() {
    const { formula } = this.props;

    return (
      <MathInput>
        <MathJax.Node formula={`${formula} = `} inline />
        <TextField
          ref={this.inputRef}
          style={{ marginTop: -7, left: 66, position: "absolute", width: 128 }}
        />
        <CharButton
          onClick={this.onInfButtonClick}
          style={{ marginTop: -7, left: 66 + 128 + 8, position: "absolute" }}
        >
          &#8734;
        </CharButton>
        <CharButton
          onClick={this.onSumButtonClick}
          style={{
            marginTop: -7,
            left: 66 + 128 + 8 + 38,
            position: "absolute",
            fontSize: 14
          }}
        >
          ∪
        </CharButton>
      </MathInput>
    );
  }
}
