import styled, { css } from "styled-components";

import { transparency } from "../../constants";
import { button, shadows } from "../../mixins";
import { getComponentColor } from "../../utils/component-color";

type UITheme = "light" | "dark";

export interface StyledButtonProps {
  background: string;
  foreground: string;
  disabled: boolean;
  isContained: boolean;
  isOutlined: boolean;
  isText: boolean;
  theme: UITheme;
}

export const getBorder = (isOutlined: boolean, theme: UITheme) => {
  if (isOutlined) {
    const rgb = theme === "light" ? 0 : 255;
    const alpha = transparency.dividers;
    return `1px solid rgba(${rgb}, ${rgb}, ${rgb}, ${alpha})`;
  }
  return "unset";
};

export const StyledButton = styled.div`
  display: inline-flex;
  min-width: 64px;
  height: 36px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  transition: 0.2s box-shadow;

  ${button()};

  ${({
    background,
    foreground,
    disabled,
    isContained,
    isOutlined,
    isText,
    theme
  }: StyledButtonProps) => css`
    background-color: ${isOutlined || isText
      ? background
      : getComponentColor(background, true, disabled, theme)};

    box-shadow: ${!disabled && !isOutlined && !isText ? shadows(2) : "unset"};
    color: ${getComponentColor(foreground, true, disabled, theme, false)}};
    border: ${getBorder(isOutlined, theme)};
    cursor: ${disabled ? "unset" : "pointer"};
    pointer-events: ${disabled ? "none" : "inherit"};

    &::before {
      content: "";
      width: calc(100% + 2px);
      height: 100%;
      top: 0;
      left: -1px;
      position: absolute;
      background-color: ${foreground};
      opacity: 0;
      transition: 0.2s opacity;
    }

    &:hover::before {
      opacity: 0.12;
    }
  `};
`;
