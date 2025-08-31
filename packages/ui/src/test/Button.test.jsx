/**
 * R3F Workspace Monorepo - UI Package
 * File: Button.test.jsx
 * Description: Unit tests for Button.test
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { render, screen } from "@testing-library/react";
import { Button } from "../Button.jsx";

describe("Button Component", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByText("Click me").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Button className='custom-class'>Button</Button>);
    expect(screen.getByText("Button")).toHaveClass("custom-class");
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText("Disabled Button")).toBeDisabled();
  });
});
