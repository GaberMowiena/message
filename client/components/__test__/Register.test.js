import { shallow } from "enzyme";
import Register from "../Register/Register";

describe("<Register />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Register />);
  });
  it("renders a div", () => {
    const divs = wrapper.find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});
