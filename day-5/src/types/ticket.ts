export type Priority = "low" | "medium" | "high";

export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: TicketStatus;
  assignee?: string;
  createdAt: string;
}
