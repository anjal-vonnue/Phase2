import { createTicket } from "../services/ticketServices.js";
import type { Priority } from "../types/ticket.js";
import pool from "./connection.js";

export async function listTicketsDB() {
  try {
    const result = await pool.query("SELECT * FROM tickets");
    return result.rows;
  } catch (error) {
    console.error("ListTicketDB error: ", error);
    throw new Error("database operation failed");
  }
}

export async function createTicketDB(data: {
  title: string;
  description: string;
  priority: Priority;
  customer_id: number;
  category_id: number;
}) {
  try {
    const result = await pool.query(
      `INSERT INTO tickets (customer_id, category_id, title, description, priority)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        data.customer_id,
        data.category_id,
        data.title,
        data.description,
        data.priority,
      ],
    );

    return result.rows[0];
  } catch (error) {
    console.error("createTicketDB error: ", error);
    throw new Error("database operation failed");
  }
}

export async function getTicketByIdDB(id: number) {
  try {
    const result = await pool.query(`SELECT * FROM tickets WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("getTicketByIdDB error: ", error);
    throw new Error("database operation failed");
  }
}

export async function updateTicketStatusDB(id: number, status: string) {
  try {
    const result = await pool.query(
      `UPDATE tickets SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id],
    );

    return result.rows[0];
  } catch (error) {
    console.error("updateTicketStatusDB error: ", error);
    throw new Error("database operation failed");
  }
}
