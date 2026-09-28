import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";

import ProtectedRoute from "../src/components/ProtectedRoute";

import { useAuth } from "../src/context/AuthContext";

vi.mock("../src/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = vi.mocked(useAuth);

describe("ProtectedRoute", () => {
  it("renders when user is logged in", () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 1,
        name: "anjal",
        email: "anjal@vonnue.com",
        role: "admin",
        createdAt: "2026-09-28",
      },
      token: "token",
      isLoading: false,
      login: (email, passoword) => {
        return new Promise((resolve) => {
          resolve();
        });
      },

      register: (email, passoword) => {
        return new Promise((resolve) => {
          resolve();
        });
      },
      logout: () => console.log("hello"),
    });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<div>Protected Page</div>}
            ></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Protected Page")).toBeInTheDocument();
  });

  it("renders when user is NOT logged in", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: "token",
      isLoading: false,
      login: (email, passoword) => {
        return new Promise((resolve) => {
          resolve();
        });
      },

      register: (email, passoword) => {
        return new Promise((resolve) => {
          resolve();
        });
      },
      logout: () => console.log("hello"),
    });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<div>Protected Page</div>}
            ></Route>
          </Route>

          <Route path="/login" element={<div>Login Page</div>}></Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Protected Page")).not.toBeInTheDocument();
  });
});
