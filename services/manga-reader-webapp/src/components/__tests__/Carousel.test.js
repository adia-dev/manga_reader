import renderer from "react-test-renderer";
import Carousel from "../Carousel";
import { render, screen } from "@testing-library/react";
const { MangaData } = require("../../data/mangas.json");

describe("Carousel component related tests", () => {
  beforeEach(() => {});

  it("Should render the carousel component", () => {
    const tree = renderer.create(<Carousel />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render the carousel component with the correct number of manga", async () => {
    render(<Carousel />);
    const mangaList = await screen.findAllByTestId("manga");
    expect(mangaList.length).toBe(MangaData.length);
  });
});
