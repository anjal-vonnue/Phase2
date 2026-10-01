import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "../src/components/Project/ProjectCard";

describe("ProjectCard", () => {
  const project = {
    name: "Issue Tracker",
    description:
      "A project management and issue tracking system for managing software development tasks.",
    tags: ["project-management", "issues", "productivity"],
  };

  it("renders the project name", () => {
    render(<ProjectCard {...project} />);

    expect(screen.getByText("Issue Tracker")).toBeInTheDocument();
  });

  it("renders the project description", () => {
    render(<ProjectCard {...project} />);

    expect(
      screen.getByText(
        "A project management and issue tracking system for managing software development tasks.",
      ),
    ).toBeInTheDocument();
  });

  it("renders all project tags", () => {
    render(<ProjectCard {...project} />);

    expect(screen.getByText("project-management")).toBeInTheDocument();
    expect(screen.getByText("issues")).toBeInTheDocument();
    expect(screen.getByText("productivity")).toBeInTheDocument();
  });

  it("renders the Tags label", () => {
    render(<ProjectCard {...project} />);

    expect(screen.getByText("Tags")).toBeInTheDocument();
  });
});
