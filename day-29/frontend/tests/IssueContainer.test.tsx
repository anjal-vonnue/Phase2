import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import useIssues from "../src/hooks/useIssues";
import { Issue } from "../src/types/types";
import IssueContainer from "../src/components/Issues/IssueContainer";

const mockIssues: Issue[] = [
  {
    id: 1,
    title: "Fix login authentication error",
    description:
      "Users are intermittently receiving authentication errors when attempting to log in.",
    status: "open",
    priority: "high",
    assignee: "John Doe",
    dueDate: "2026-09-21",
    labels: ["bug", "help wanted"],
    project: "Issue Tracker",
  },
  {
    id: 2,
    title: "Update dashboard loading state",
    description:
      "Add a loading indicator while dashboard data is being fetched.",
    status: "in_progress",
    priority: "medium",
    assignee: "Jane Smith",
    dueDate: "2026-09-27",
    labels: ["enhancement"],
    project: "Issue Tracker",
  },
];

const retry = vi.fn();

vi.mock("../src/hooks/useIssues");

describe("IssueContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders issues", () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: mockIssues,
      isLoading: false,
      error: null,
      retry: retry,
      setIssues: vi.fn(),
    });
    render(
      <MemoryRouter>
        <IssueContainer />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Fix login authentication error"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Add a loading indicator while dashboard data is being fetched.",
      ),
    ).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: mockIssues,
      isLoading: true,
      error: null,
      retry: retry,
      setIssues: vi.fn(),
    });
    render(
      <MemoryRouter>
        <IssueContainer />
      </MemoryRouter>,
    );

    expect(screen.getByText("Issues are Loading....")).toBeInTheDocument();
  });

  it("shows error state", () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: mockIssues,
      isLoading: false,
      error: new Error("falied to fetch issues"),
      retry: retry,
      setIssues: vi.fn(),
    });
    render(
      <MemoryRouter>
        <IssueContainer />
      </MemoryRouter>,
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("calls retry when retry button is clicked", async () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: [],
      isLoading: false,
      error: new Error("falied to fetch issues"),
      retry: retry,
      setIssues: vi.fn(),
    });
    render(
      <MemoryRouter>
        <IssueContainer />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    expect(screen.getByText("Error")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Retry?" }));
    expect(retry).toHaveBeenCalled();
  });

  it("filter issues by title search", async () => {
    const user = userEvent.setup();
    vi.mocked(useIssues).mockReturnValue({
      issues: mockIssues,
      isLoading: false,
      error: null,
      retry: retry,
      setIssues: vi.fn(),
    });

    render(
      <MemoryRouter>
        <IssueContainer />
      </MemoryRouter>,
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "Fix login");

    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(
      screen.getByText("Fix login authentication error"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Update dashboard loading state"),
    ).not.toBeInTheDocument();
  });

  it("filters issues by status", async () => {
    const user = userEvent.setup();
    vi.mocked(useIssues).mockReturnValue({
      issues: mockIssues,
      isLoading: false,
      error: null,
      retry: retry,
      setIssues: vi.fn(),
    });

    render(
      <MemoryRouter>
        <IssueContainer />
      </MemoryRouter>,
    );

    await user.selectOptions(screen.getByLabelText("Status"), "open");

    expect(
      screen.getByText("Fix login authentication error"),
    ).toBeInTheDocument();
  });

  it("filters issues by priority", async () => {
    const user = userEvent.setup();
    vi.mocked(useIssues).mockReturnValue({
      issues: mockIssues,
      isLoading: false,
      error: null,
      retry: retry,
      setIssues: vi.fn(),
    });

    render(
      <MemoryRouter>
        <IssueContainer />
      </MemoryRouter>,
    );

    await user.selectOptions(screen.getByLabelText("Priority"), "medium");
    expect(
      screen.getByText("Update dashboard loading state"),
    ).toBeInTheDocument();
  });

  it("filters issues by priority", async () => {
    const user = userEvent.setup();
    vi.mocked(useIssues).mockReturnValue({
      issues: mockIssues,
      isLoading: false,
      error: null,
      retry: retry,
      setIssues: vi.fn(),
    });

    render(
      <MemoryRouter>
        <IssueContainer />
      </MemoryRouter>,
    );

    await user.selectOptions(screen.getByLabelText("Assignee"), "John Doe");

    expect(
      screen.getByText("Fix login authentication error"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Update dashboard loading state"),
    ).not.toBeInTheDocument();
  });
});
