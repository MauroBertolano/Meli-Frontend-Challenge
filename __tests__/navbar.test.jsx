import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../components/navbar/navbar";
import Router from "next/router";

const mockPushFn = jest.fn();

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockPushFn,
    query: {},
    beforePopState: jest.requireActual("next/router"),
  })),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Navbar", () => {
  it("renders nav bar", () => {
    render(<Navbar />);

    const textbox = screen.getByRole("textbox");
    const submitBtn = screen.getByRole("button", { name: /buscar/i });
    const img = screen.getByRole("img", { name: /mercado libre logo/i });

    expect(textbox).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  it("redirects on search", () => {
    render(<Navbar />);

    const textbox = screen.getByRole("textbox");

    fireEvent.change(textbox, { target: { value: "ipad" } });

    const submitBtn = screen.getByRole("button", { name: /buscar/i });

    fireEvent.click(submitBtn);

    expect(mockPushFn).toHaveBeenCalledWith({
      pathname: "/items",
      query: { search: "ipad" },
    });
  });

  it("prevents search when text is empty", () => {
    render(<Navbar />);

    const textbox = screen.getByRole("textbox");

    fireEvent.change(textbox, { target: { value: "" } });

    const submitBtn = screen.getByRole("button", { name: /buscar/i });

    fireEvent.click(submitBtn);

    expect(mockPushFn).toHaveBeenCalledTimes(0);
  });

  it("redirects to home page on logo click", () => {
    render(<Navbar />);

    const img = screen.getByRole("img", { name: /mercado libre logo/i });

    fireEvent.click(img);

    expect(mockPushFn).toHaveBeenCalledWith("/", undefined, { shallow: true });
  });

  it("search has default value on search", () => {
    jest.spyOn(Router, "useRouter").mockImplementation(() => ({
      query: { search: "tablet" },
    }));

    render(<Navbar />);

    const textbox = screen.getByRole("textbox");

    expect(textbox).toHaveValue("tablet");
  });

  it("search has default value on search for array", () => {
    jest.spyOn(Router, "useRouter").mockImplementation(() => ({
      query: { search: ["tablet", "ipad"] },
    }));

    render(<Navbar />);

    const textbox = screen.getByRole("textbox");

    expect(textbox).toHaveValue("tablet");
  });
});
