import styled, { css } from "styled-components";

export const Root = styled.div`
  width: 100%;
  position: relative;
`;

export const Container = styled.div`
  width: 100%;
  height: 32px;
  position: relative;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.06);
  user-select: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  &:hover {
    & .hover-border {
      opacity: 1;
    }
  }
`;

export const HoverBorder = styled.div`
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.39);
  transition: 0.15s opacity;
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  height: calc(100% - 16px);
  border: none;
  outline: none;
  margin: 0;
  padding-left: 8px;
  padding-right: 8px;
  -webkit-text-fill-color: transparent;
  background-color: transparent;
  font-size: 16px;
  cursor: pointer;
  text-shadow: ${`0px 0px 0px rgba(0, 0, 0, 0.89)`};
  font-size: 14px;
  ${({ color }: { color: string }) => css`
    color: ${color};
  `};
  &:focus {
    cursor: text;
  }
`;

export interface IndicatorProps {
  color: string;
  activated: boolean;
}

export const Indicator = styled.div`
  height: 2px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -1px;
  transition: 0.15s ease-out;
  will-change: width;
  ${({ color, activated }: IndicatorProps) => css`
    width: ${activated ? 100 : 0}%;
    background-color: ${color};
  `};
`;
