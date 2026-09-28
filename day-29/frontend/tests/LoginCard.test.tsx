import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import LoginCard from "../src/components/Auth/LoginCard";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../src/context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

vi.mock("react-router", async () => {
  const mod = await vi.importActual("react-router");
  return {
    ...mod,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows to enter details", async () => {
    const user = userEvent.setup();

    mockLogin.mockResolvedValue(undefined);

    render(
      <MemoryRouter>
        <LoginCard />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText("Email");
    const passWordInput = screen.getByLabelText("Password");

    await user.type(emailInput, "anjal@vonnue.com");
    await user.type(passWordInput, "password123");

    expect(emailInput).toHaveValue("anjal@vonnue.com");
    expect(passWordInput).toHaveValue("password123");

    await user.click(screen.getByRole("button", { name: "LogIn" }));

    expect(mockLogin).toHaveBeenCalledWith("anjal@vonnue.com", "password123");

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("rejects when wrong credential are entered", async () => {
    const user = userEvent.setup();

    mockLogin.mockRejectedValue(new Error("invalid email or password"));

    render(
      <MemoryRouter>
        <LoginCard />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText("Email");
    const passWordInput = screen.getByLabelText("Password");

    await user.type(emailInput, "anjal@vonnue.com");
    await user.type(passWordInput, "password123");

    expect(emailInput).toHaveValue("anjal@vonnue.com");
    expect(passWordInput).toHaveValue("password123");

    await user.click(screen.getByRole("button", { name: "LogIn" }));

    expect(mockLogin).toHaveBeenCalledWith("anjal@vonnue.com", "password123");

    expect(mockNavigate).not.toHaveBeenCalledWith("/dashboard");
  });
});
