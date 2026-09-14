import pool from "./connection.js";

export async function listTicketsDB() {
  try {
    const result = await pool.query("SELECT * FROM tickets");
    return result.rows;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("database operation failed");
  }
}
