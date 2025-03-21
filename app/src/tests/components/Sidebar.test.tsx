import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../../components/ui/Sidebar";

describe("Sidebar", () => {
  it("renders all panels", () => {
    render(<Sidebar />);
    expect(screen.getByText("CodeSmart")).toBeInTheDocument();
    expect(screen.getByText("Hint")).toBeInTheDocument();
    expect(screen.getByText("Code Feedback")).toBeInTheDocument();
    expect(screen.getByText("Collaboration Chat")).toBeInTheDocument();
    expect(screen.getByText("Visualization")).toBeInTheDocument();
  });
});
