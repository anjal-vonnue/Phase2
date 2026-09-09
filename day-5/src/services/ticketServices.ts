import { getTickets, saveTickets } from "../storage/ticketStorage.js";
import type { Priority, Ticket, TicketStatus } from "../types/ticket.js";

export async function createTicket(ticket: {
  title: string;
  description: string;
  priotity: Priority;
  assignee?: string;
}): Promise<Ticket> {
  const tickets = await getTickets();
  let id = 0;
  if (tickets.length > 0) {
    id = Math.max(...tickets.map((ticket: Ticket) => ticket.id)) + 1;
  }

  const newTicket: Ticket = {
    id: id,
    title: ticket.title,
    description: ticket.description,
    priority: ticket.priotity,
    status: "open",
    createdAt: new Date().toISOString(),
  };

  tickets.push(newTicket);

  await saveTickets(tickets);

  return newTicket;
}

export async function listTickets() {
  const tickets = await getTickets();
  return tickets;
}

export async function getTicketById(id: number): Promise<Ticket | undefined> {
  const tickets = await getTickets();
  const ticket = tickets.find((ticket) => ticket.id === id);
  return ticket;
}

export async function updateTicketStatus(id: number, status: TicketStatus) {
  const tickets = await getTickets();
  const ticket = tickets.find((ticket) => ticket.id === id);

  if (!ticket) {
    return undefined;
  }

  ticket.status = status;
  await saveTickets(tickets);
  return ticket;
}

export async function addAssignee(
  id: number,
  assignee: string,
): Promise<Ticket | undefined> {
  const tickets = await getTickets();
  const ticket = tickets.find((ticket) => ticket.id === id);

  if (!ticket) {
    return undefined;
  }

  ticket.assignee = assignee;
  await saveTickets(tickets);
  return ticket;
}

export async function deleteTicket(id: number): Promise<boolean> {
  const tickets = await getTickets();
  const newTickets = tickets.filter((ticket) => ticket.id !== id);

  if (tickets.length === newTickets.length) {
    return false;
  }

  await saveTickets(newTickets);
  return true;
}
