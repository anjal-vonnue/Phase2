export type StatusType = "open" | "in_progress" | "resolve" | "closed";

export type PriorityType = "low" | "medium" | "high";

export type LabelsType =
  | "bug"
  | "documentation"
  | "duplicate"
  | "enhancement"
  | "good first issue"
  | "help wanted"
  | "invalid"
  | "question"
  | "wontfix";

export interface Issue {
  id?: number;
  title: string;
  description: string;
  status: StatusType;
  priority: PriorityType;
  assignee: string;
  dueDate: string;
  labels: LabelsType[];
  project: string;
}

export type Project = {
  id: number;
  name: string;
  description: string;
  tags: string[];
};
