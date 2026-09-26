import { IssueStatus, Priority } from "../generated/prisma/enums.js";

type LabelsType =
  | "bug"
  | "documentation"
  | "duplicate"
  | "enhancement"
  | "good first issue"
  | "help wanted"
  | "invalid"
  | "question"
  | "wontfix";

export type IssueSeed = {
  title: string;
  description: string;
  status: IssueStatus;
  priority: Priority;
  assignee: string;
  dueDate: string;
  labels: string[];
  project: string;
};

export const issues: IssueSeed[] = [
  {
    title: "Fix login authentication error",
    description:
      "Users are intermittently receiving authentication errors when attempting to log in.",
    status: IssueStatus.open,
    priority: Priority.high,
    assignee: "John Doe",
    dueDate: "2026-09-21",
    labels: ["bug", "help wanted"],
    project: "Issue Tracker",
  },
  {
    title: "Update dashboard loading state",
    description:
      "Add a loading indicator while dashboard data is being fetched.",
    status: IssueStatus.in_progress,
    priority: Priority.medium,
    assignee: "Jane Smith",
    dueDate: "2026-09-27",
    labels: ["enhancement"],
    project: "Issue Tracker",
  },
  {
    title: "Resolve broken profile image upload",
    description:
      "Profile images fail to upload when the file size exceeds the default limit.",
    status: IssueStatus.resolve,
    priority: Priority.high,
    assignee: "Mike Johnson",
    dueDate: "2026-09-24",
    labels: ["bug"],
    project: "User Management",
  },
  {
    title: "Improve mobile navigation",
    description:
      "The navigation menu overlaps page content on smaller mobile screens.",
    status: IssueStatus.open,
    priority: Priority.medium,
    assignee: "Sarah Wilson",
    dueDate: "2026-09-30",
    labels: ["bug", "enhancement"],
    project: "Frontend",
  },
  {
    title: "Add issue filtering",
    description:
      "Allow users to filter issues by status, priority, and assignee.",
    status: IssueStatus.in_progress,
    priority: Priority.medium,
    assignee: "Alex Brown",
    dueDate: "2026-10-02",
    labels: ["enhancement"],
    project: "Issue Tracker",
  },
  {
    title: "Fix notification email formatting",
    description:
      "Notification emails contain incorrect spacing and formatting in the issue details section.",
    status: IssueStatus.closed,
    priority: Priority.low,
    assignee: "Emily Davis",
    dueDate: "2026-09-20",
    labels: ["bug"],
    project: "Notifications",
  },
  {
    title: "Database connection timeout",
    description:
      "API requests occasionally fail because database connections are timing out under high load.",
    status: IssueStatus.open,
    priority: Priority.high,
    assignee: "Chris Miller",
    dueDate: "2026-09-26",
    labels: ["bug", "help wanted"],
    project: "Backend",
  },
  {
    title: "Add due date validation",
    description:
      "Prevent users from selecting invalid or past due dates when creating an issue.",
    status: IssueStatus.in_progress,
    priority: Priority.low,
    assignee: "Lisa Anderson",
    dueDate: "2026-10-05",
    labels: ["enhancement"],
    project: "Issue Tracker",
  },
  {
    title: "Correct issue status display",
    description:
      "Some issues display the internal status value instead of the formatted status label.",
    status: IssueStatus.resolve,
    priority: Priority.medium,
    assignee: "David Taylor",
    dueDate: "2026-09-28",
    labels: ["bug"],
    project: "Frontend",
  },
  {
    title: "Remove deprecated API endpoint",
    description:
      "Remove the unused legacy API endpoint and update related documentation.",
    status: IssueStatus.closed,
    priority: Priority.low,
    assignee: "Robert Wilson",
    dueDate: "2026-09-18",
    labels: ["documentation", "enhancement"],
    project: "Backend",
  },
];
