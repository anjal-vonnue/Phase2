import z from "zod";

export const IssueSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "title must be greater than 5 chars")
    .max(100, "title must be less than 100 chars"),
  description: z
    .string()
    .trim()
    .min(5, "decription must be greater than 5 chars"),
  status: z.enum(["open", "in_progress", "resolve", "closed"]),
  priority: z.enum(["high", "medium", "low"]),
  assignee: z.string().trim().min(1, "assignee is required"),
  dueDate: z.string().min(1, "due date is required"),
  project: z.string().trim().min(1, "project is required"),
  labels: z.array(
    z.enum([
      "bug",
      "documentation",
      "duplicate",
      "enhancement",
      "good first issue",
      "help wanted",
      "invalid",
      "question",
      "wontfix",
    ]),
  ),
});
