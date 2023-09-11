// import { render } from "@testing-library/react";
import { LinkSimple } from "./Link";
import { renderWithProviders } from "../../../../test/test-utils";

describe("Link tests", () => {
  test("snapshot test", () => {
    const link = renderWithProviders(<LinkSimple to="/home" value="home" />);
    expect(link).toMatchSnapshot();
  });
});
