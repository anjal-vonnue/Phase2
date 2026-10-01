import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import useIssues from "../src/hooks/useIssues";
import { Issue } from "../src/types/types";
import IssueCard from "../src/components/Issues/IssueCard";

const issue: Issue = {
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
};

describe("IssueCard", () => {
  it("links to issue details page", () => {
    render(
      <MemoryRouter>
        <IssueCard
          issue={issue}
          setEditingIssue={vi.fn()}
          setToggleModal={vi.fn()}
        />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/issues/1");
  });
});
