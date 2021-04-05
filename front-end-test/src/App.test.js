import {render} from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App />, div);
});
