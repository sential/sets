import * as React from "react";
import { MathInput, CharButton } from "./style";
import TextField from "../TextField";
import { colors } from "../../constants";

const MathJax = require("react-mathjax").default;

interface Props {
  formula: string;
  state: string;
  validFormula: string;
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

  public setValue = (val: string) => {
    const { inputElement } = this.inputRef.current;
    inputElement.value = val;
  };

  public render() {
    const { formula, state, validFormula } = this.props;

    return (
      <MathInput>
        <MathJax.Node style={{ width: 72 }} formula={`${formula} = `} inline />
        <TextField
          ref={this.inputRef}
          isError={state === "error"}
          color={
            state === "none"
              ? colors.blue["500"]
              : state === "valid"
                ? colors.green["500"]
                : colors.red["500"]
          }
          style={{ marginTop: -7, flex: 1 }}
        />
        <MathJax.Node
          style={{
            width: 72,
            position: "absolute",
            top: 27,
            left: 72,
            color: colors.red["500"],
            fontSize: 12
          }}
          formula={state === "error" ? validFormula : ""}
          inline
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
