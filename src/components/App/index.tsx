import * as React from "react";
import { StyledApp, Dialog, Header } from "./style";

export default class App extends React.Component {
  public render() {
    return (
      <StyledApp>
        <Dialog>
          <Header>Online sets test</Header>
        </Dialog>
      </StyledApp>
    );
  }
}
