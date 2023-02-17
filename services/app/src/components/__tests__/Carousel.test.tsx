import Carousel from "../Carousel"
import { render, screen } from "@testing-library/react";
const mangas = require("../../data/mangas.json");

describe("Carousel component related tests", () => {
  beforeEach(() => { });

  it("Should render the carousel component", () => {
    render(<Carousel setSearchBarOpened={() => { }} />);
    const carousel = screen.getByTestId("carousel");
    expect(carousel).toBeInTheDocument();
  });

  it("Should render the carousel component with the correct number of manga", async () => {
    render(<Carousel setSearchBarOpened={() => { }} />);
    const mangaList = await screen.findAllByTestId("carousel-item");
    expect(mangaList.length).toBe(mangas.length);
  });

  it("Should render the titles of the manga in the page", async () => {
    const { asFragment } = render(<Carousel setSearchBarOpened={() => { }} />);
    mangas.forEach((manga: any) => {
      expect(asFragment()).toHaveTextContent(manga.title);
    });
  });

  it("Should render the user instructions correctly", () => {
    render(<Carousel setSearchBarOpened={() => { }} />);
    const instructions = screen.getByText("Mouse and Keyboard support");
    expect(instructions).toBeInTheDocument();
  });

  it("Should render the UI when the user clicks and holds the left mouse button", () => {
    render(<Carousel setSearchBarOpened={() => { }} />);
    const carousel = screen.getAllByTestId("carousel-item")[0];
    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      button: 0,
    });
    carousel.dispatchEvent(event);
    expect(carousel).toHaveClass("grabbing");
  });
});
