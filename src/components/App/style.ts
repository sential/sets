import styled from "styled-components";
import { shadows } from "../../mixins";

export const StyledApp = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Dialog = styled.div`
  border-radius: 4px;
  background-color: #fff;
  padding: 16px;
  width: 350px;
  box-shadow: ${shadows(6)};
`;

export const Header = styled.div`
  font-size: 20px;
  margin-bottom: 24px;
`;
