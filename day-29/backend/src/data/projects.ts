export type ProjectSeed = {
  name: string;
  description: string;
  tags: string[];
};

export const projects: ProjectSeed[] = [
  {
    name: "Issue Tracker",
    description:
      "A project management and issue tracking system for managing software development tasks.",
    tags: ["project-management", "issues", "productivity"],
  },
  {
    name: "Frontend",
    description:
      "Frontend development and user interface improvements for the application.",
    tags: ["frontend", "react", "ui", "ux"],
  },
  {
    name: "Backend",
    description:
      "Backend services, APIs, database infrastructure, and server-side improvements.",
    tags: ["backend", "api", "database", "server"],
  },
  {
    name: "User Management",
    description:
      "Features related to user accounts, authentication, profiles, and permissions.",
    tags: ["users", "authentication", "profiles", "security"],
  },
  {
    name: "Notifications",
    description:
      "Email and in-app notification functionality and related improvements.",
    tags: ["notifications", "email", "messaging"],
  },
  {
    name: "Mobile App",
    description:
      "Development and improvements for the mobile version of the application.",
    tags: ["mobile", "ios", "android"],
  },
  {
    name: "Documentation",
    description:
      "Technical documentation, guides, API references, and project documentation.",
    tags: ["documentation", "guides", "api"],
  },
  {
    name: "Performance",
    description:
      "Improvements to application performance, database queries, and API response times.",
    tags: ["performance", "optimization", "database"],
  },
];
