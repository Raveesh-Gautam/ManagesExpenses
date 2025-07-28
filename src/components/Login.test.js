import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Custom from "./Custom";

test("renders Custom text", () => {
  render(<Custom />);
  const textElement = screen.getByText(/Custom/i);
  expect(textElement).toBeInTheDocument();
});
