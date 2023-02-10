import { render, screen } from "@testing-library/react";
import App from "../App";

it("Check if the app renders", () => {
  render(<App />);
  const app = screen.getByTestId("app");
  expect(app).toBeInTheDocument();
});
