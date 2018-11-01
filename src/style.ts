import { css } from "styled-components";

import robotoRegular from "./resources/fonts/roboto-regular.woff2";
import computerModern from "./resources/fonts/cmunsi.woff";

export const Style = css`
  @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    src: url(${robotoRegular}) format("woff2");
  }

  @font-face {
    font-family: "Computer Modern";
    font-style: normal;
    font-weight: 400;
    src: url(${computerModern}) format("woff");
  }

  body {
    margin: 0;
    font-size: 14px;
    font-family: Roboto;
    background-color: white;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }
`;
