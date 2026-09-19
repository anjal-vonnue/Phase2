import z from "zod";
import type { Priority } from "../types/ticket.js";
import { title } from "node:process";
import type { TypeOf } from "zod/v3";

export function validateTicket(ticket: {
  title: string;
  description: string;
  priority: Priority;
  customer_id: number;
  category_id: number;
}) {
  if (!ticket.title || ticket.title.trim().length < 3) {
    return "title must be at least 3 chars.";
  }

  if (!ticket.description || ticket.description.trim().length < 6) {
    return "description must be at lead 6 chars.";
  }

  if (!["low", "medium", "high"].includes(ticket.priority)) {
    console.log(ticket.priority);

    return "ticket priority must be low, medium, and high.";
  }
}

interface QueryType {
  page: number;
  pageSize: number;
  status: string;
  priority: string;
  assignee: number;
  search: string;
  sortField: string;
  sortDirection: string;
}

export function validateQuery(query: Partial<QueryType>) {
  const errors: string[] = [];

  let page = 1;
  let pageSize = 10;
  let status: string | undefined;
  let priority: string | undefined;
  let assignee: number | undefined;
  let search: string | undefined;
  let sortField: string = "createdAt";
  let sortDirection: string = "asc";

  if (query.page !== undefined) {
    const value = Number(query.page);
    if (!Number.isInteger(value) || value < 1) {
      errors.push("page must be a positive integer");
    } else {
      page = value;
    }
  }

  if (query.pageSize !== undefined) {
    const value = Number(query.pageSize);
    if (!Number.isInteger(value) || value < 1 || value > 100) {
      errors.push("page size must be in between 1 and 100");
    } else {
      pageSize = value;
    }
  }

  if (query.status !== undefined) {
    const value = String(query.status);
    if (!["open", "in_progress", "resolve", "closed"].includes(value)) {
      errors.push("invalid status");
    } else {
      status = value;
    }
  }

  if (query.priority !== undefined) {
    const value = String(query.priority);
    if (!["low", "medium", "high"].includes(value)) {
      errors.push("invalid priority");
    } else {
      priority = value;
    }
  }

  if (query.assignee !== undefined) {
    const value = Number(query.assignee);
    if (!Number.isInteger(value) || value < 1) {
      errors.push("assigne value must be a postive integer");
    } else {
      assignee = value;
    }
  }

  if (query.search !== undefined) {
    const value = String(query.search).trim();
    if (value.length === 0) {
      errors.push("search can't be empty");
    } else {
      search = value;
    }
  }

  if (query.sortField !== undefined) {
    const value = String(query.sortField);
    if (!["createdAt", "updatedAt", "priority", "status"].includes(value)) {
      errors.push("invalid sort query");
    } else {
      sortField = value;
    }
  }

  if (query.sortDirection !== undefined) {
    const value = String(query.sortDirection);
    if (!["asc", "desc"].includes(value)) {
      errors.push("invalid sort direction");
    } else {
      sortDirection = value;
    }
  }

  return {
    errors,
    page,
    pageSize,
    status,
    priority,
    assignee,
    search,
    sortField,
    sortDirection,
  };
}

export const ticketSchema = z.object({
  title: z.string().trim().min(3, "title must be at least 2 chars"),
  description: z
    .string()
    .trim()
    .min(6, "description must be at least 6 characters"),
  priority: z.enum(["low", "medium", "high"]),
  category_id: z.number().int(),
});

export type CreateTicket = z.infer<typeof ticketSchema>;
