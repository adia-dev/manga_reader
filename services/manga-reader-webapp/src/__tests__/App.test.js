import renderer from "react-test-renderer";
import App from "../App";
const { MangaData } = require("../data/mangas.json");

it("Check if the app renders", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
