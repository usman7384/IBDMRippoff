import React from "react";

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

test("renders home, login, and signup links", () => {
  render(<App />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  expect(screen.getByText(/Reliable Movie Services/i)).toBeInTheDocument();
  expect(screen.getByText(/Reliable Movie Services/i)).toBeInTheDocument();
  expect(screen.getByText(/All right reserved/i)).toBeInTheDocument();
});
