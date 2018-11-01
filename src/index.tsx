import * as React from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";

import { Style } from "./style";
import App from "./components/App";

createGlobalStyle`${Style}`;

render(<App />, document.getElementById("app"));
