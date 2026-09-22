import type { Issue } from "../types/types";

export const issues: Issue[] = [
  {
    id: "ISS-001",
    title: "Fix login authentication error",
    description:
      "Users are intermittently receiving authentication errors when attempting to log in.",
    status: "open",
    priority: "high",
    assignee: "John Doe",
    dueDate: "2026-09-25",
  },
  {
    id: "ISS-002",
    title: "Update dashboard loading state",
    description:
      "Add a loading indicator while dashboard data is being fetched.",
    status: "in_progress",
    priority: "medium",
    assignee: "Jane Smith",
    dueDate: "2026-09-27",
  },
  {
    id: "ISS-003",
    title: "Resolve broken profile image upload",
    description:
      "Profile images fail to upload when the file size exceeds the default limit.",
    status: "resolve",
    priority: "high",
    assignee: "Mike Johnson",
    dueDate: "2026-09-24",
  },
  {
    id: "ISS-004",
    title: "Improve mobile navigation",
    description:
      "The navigation menu overlaps page content on smaller mobile screens.",
    status: "open",
    priority: "medium",
    assignee: "Sarah Wilson",
    dueDate: "2026-09-30",
  },
  {
    id: "ISS-005",
    title: "Add issue filtering",
    description:
      "Allow users to filter issues by status, priority, and assignee.",
    status: "in_progress",
    priority: "medium",
    assignee: "Alex Brown",
    dueDate: "2026-10-02",
  },
  {
    id: "ISS-006",
    title: "Fix notification email formatting",
    description:
      "Notification emails contain incorrect spacing and formatting in the issue details section.",
    status: "closed",
    priority: "low",
    assignee: "Emily Davis",
    dueDate: "2026-09-20",
  },
  {
    id: "ISS-007",
    title: "Database connection timeout",
    description:
      "API requests occasionally fail because database connections are timing out under high load.",
    status: "open",
    priority: "high",
    assignee: "Chris Miller",
    dueDate: "2026-09-26",
  },
  {
    id: "ISS-008",
    title: "Add due date validation",
    description:
      "Prevent users from selecting invalid or past due dates when creating an issue.",
    status: "in_progress",
    priority: "low",
    assignee: "Lisa Anderson",
    dueDate: "2026-10-05",
  },
  {
    id: "ISS-009",
    title: "Correct issue status display",
    description:
      "Some issues display the internal status value instead of the formatted status label.",
    status: "resolve",
    priority: "medium",
    assignee: "David Taylor",
    dueDate: "2026-09-28",
  },
  {
    id: "ISS-010",
    title: "Remove deprecated API endpoint",
    description:
      "Remove the unused legacy API endpoint and update related documentation.",
    status: "closed",
    priority: "low",
    assignee: "Robert Wilson",
    dueDate: "2026-09-18",
  },
];
