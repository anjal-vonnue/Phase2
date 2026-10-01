import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import ProjectDashboard from "../src/components/Dashboard/ProjectDashboard";
import useProjects from "../src/hooks/useProjects";
import useDocumentTitle from "../src/hooks/useDocumentTitle";

vi.mock("../src/hooks/useProjects");
// vi.mock("../src/hooks/useDocumentTitle");

const mockedUseProjects = vi.mocked(useProjects);

describe("ProjectDashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    mockedUseProjects.mockReturnValue({
      projects: [],
      isLoading: true,
      error: null,
      retry: vi.fn(),
    });

    render(<ProjectDashboard />);

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockedUseProjects.mockReturnValue({
      projects: [],
      isLoading: false,
      error: new Error("failed to fetch projects"),
      retry: vi.fn(),
    });

    render(<ProjectDashboard />);

    // console.log(screen.getByText("Error"));

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("failed to fetch projects")).toBeInTheDocument();
  });

  it("calls retry when retry button is clicked", async () => {
    const retry = vi.fn();
    mockedUseProjects.mockReturnValue({
      projects: [],
      isLoading: false,
      error: new Error("failed to fetch projects"),
      retry,
    });

    const user = userEvent.setup();

    render(<ProjectDashboard />);

    await user.click(screen.getByRole("button"));

    expect(retry).toHaveBeenCalled();
  });

  it("renders project", () => {
    mockedUseProjects.mockReturnValue({
      projects: [
        {
          id: 1,
          name: "Issue Tracker",
          description:
            "A project management and issue tracking system for managing software development tasks.",
          tags: ["project-management", "issues", "productivity"],
        },
        {
          id: 2,
          name: "Frontend",
          description:
            "Frontend development and user interface improvements for the application.",
          tags: ["frontend", "react", "ui", "ux"],
        },
      ],
      isLoading: false,
      error: null,
      retry: vi.fn(),
    });

    render(<ProjectDashboard />);

    expect(screen.getByText("Issue Tracker")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();

    expect(
      screen.getByText(
        "A project management and issue tracking system for managing software development tasks.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Frontend development and user interface improvements for the application.",
      ),
    ).toBeInTheDocument();
  });
});
