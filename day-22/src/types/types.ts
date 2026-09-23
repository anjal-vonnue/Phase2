export type StatusType = "open" | "in_progress" | "resolve" | "closed";

export type PriorityType = "low" | "medium" | "high";

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: StatusType;
  priority: PriorityType;
  assignee: string;
  dueDate: string;
}
