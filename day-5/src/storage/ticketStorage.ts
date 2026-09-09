import { readFile, writeFile } from "node:fs/promises";
import type { Ticket } from "../types/ticket.js";

export async function getTickets(): Promise<Ticket[]> {
  try {
    const tickets = await readFile("data/tickets.json", "utf-8");
    if (!tickets.trim()) {
      return [];
    }

    const parsedTickets = JSON.parse(tickets) as Ticket[];

    if (!Array.isArray(parsedTickets)) {
      return [];
    }

    return parsedTickets;
  } catch (error) {
    console.log("Error while reading Tickets ", error);
    return [];
  }
}

export async function saveTickets(tickets: Ticket[]): Promise<void> {
  try {
    const stringifiedTickets = JSON.stringify(tickets);
    await writeFile("data/tickets.json", stringifiedTickets, "utf-8");
  } catch (error) {
    console.log("error while saving tickets ", error);
  }
}
