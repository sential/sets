import styled from "styled-components";

export const MathInput = styled.div`
  display: flex;
  position: relative;
  margin-top: 32px;
`;

export const CharButton = styled.div`
  height: 32px;
  width: 32px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: default;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.06);
  transition: 0.2s background-color;
  margin-left: 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;
