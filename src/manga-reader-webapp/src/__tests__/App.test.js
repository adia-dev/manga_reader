import renderer from "react-test-renderer";
import App from "../App";

it("Renders Hello World! on the App", () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
