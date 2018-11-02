import * as React from "react";

import {
  Container,
  HoverBorder,
  Indicator,
  Input,
  InputContainer,
  Root
} from "./style";

export type ClickEvent = (e?: React.SyntheticEvent<HTMLDivElement>) => void;
export type KeyboardEvent = (e?: React.KeyboardEvent<HTMLInputElement>) => void;

export interface IProps {
  color?: string;
  style?: any;
  onKeyPress?: KeyboardEvent;
}

export interface IState {
  activated: boolean;
}

export default class Textfield extends React.Component<IProps, IState> {
  public static defaultProps = {
    color: "#2196F3"
  };

  public state: IState = {
    activated: false
  };

  public inputElement: HTMLInputElement;

  public getValue = () => this.inputElement.value;

  public setValue = (value: string) => {
    this.inputElement.value = value;
    this.inputElement.focus();
  };

  public render() {
    const { color, style, onKeyPress } = this.props;
    const { activated } = this.state;

    return (
      <Root onClick={this.onClick} style={style}>
        <Container>
          <InputContainer>
            <Input
              ref={(r: any) => (this.inputElement = r)}
              color={color}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onKeyPress={onKeyPress}
            />
          </InputContainer>
          <HoverBorder className="hover-border" />
          <Indicator color={color} activated={activated} />
        </Container>
      </Root>
    );
  }

  private onClick = () => {
    this.inputElement.focus();
  };

  private onFocus = () => {
    this.setState({
      activated: true
    });
  };

  private onBlur = () => {
    const { activated } = this.state;

    if (this.inputElement.value.length === 0 && activated) {
      this.setState({
        activated: false
      });
    }
  };
}
