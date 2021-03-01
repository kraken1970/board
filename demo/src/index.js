import React, { Component } from "react";
import { render } from "react-dom";

// components
import CssBaseline from "@material-ui/core/CssBaseline";

import { BoardDemo } from "./BoardDemo";
import { BoardProvider } from "../../src/store";

// utils
import { normalizeData } from "../../src/utils";
import { columns } from "./fixtures";

export default class Demo extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <BoardProvider columns={normalizeData(columns)}>
          <BoardDemo />
        </BoardProvider>
      </>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
