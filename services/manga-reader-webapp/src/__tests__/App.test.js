import { render, screen } from "@testing-library/react";
import App from "../App";

it("Checks if the app renders", () => {
  render(<App />);
  const app = screen.getByTestId("app");
  expect(app).toBeInTheDocument();
});
