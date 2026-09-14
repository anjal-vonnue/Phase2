import { Router } from "express";
import {
  addAssignee,
  createTicket,
  deleteTicket,
  getTicketById,
  updateTicketStatus,
  validateTicket,
} from "../services/ticketServices.js";
import { createTicketDB, listTicketsDB } from "../db/database.js";

const router = Router();

// need to change
router.post("/tickets", async (req, res) => {
  try {
    const error = validateTicket(req.body);
    if (error) {
      res.status(400).json({ error: error });
    }

    const ticket = await createTicketDB(req.body);

    res.status(201).json({ ticket });
  } catch (error) {
    res.status(500).json({ message: "failed to create tickets" });
  }
});

router.get("/tickets", async (req, res) => {
  try {
    const tickets = await listTicketsDB();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch tickets" });
  }
});

// need to change
router.get("/tickets/:id", async (req, res) => {
  const ticket = await getTicketById(Number(req.params.id));
  if (!ticket) {
    res.status(404).json({ error: "ticket not found" });
  }
  res.status(200).json(ticket);
});

// need to change
router.patch("/tickets/:id/status", async (req, res) => {
  const { status } = req.body;
  if (!["open", "in-progress", "resolved", "closed"].includes(status)) {
    res.status(400).json({ error: "invalid status" });
  }

  const ticket = await updateTicketStatus(Number(req.params.id), status);

  if (!ticket) {
    res.status(404).json({ error: "ticket not found" });
  }

  res.status(200).json(ticket);
});

// need to change
router.patch("/tickets/:id/assignee", async (req, res) => {
  const { assignee } = req.body;
  if (!assignee && typeof assignee !== "string") {
    res.status(400).json({ error: "invalid assingee" });
  }

  const ticket = await addAssignee(Number(req.params.id), assignee);

  if (!ticket) {
    res.status(404).json({ error: "ticket not found" });
  }

  res.status(200).json(ticket);
});

// need to change
router.delete("/tickets/:id", async (req, res) => {
  const success = deleteTicket(Number(req.params.id));
  if (!success) {
    res.status(404).json({ error: "ticket not found" });
  }

  res.status(200).json({ message: "ticket deleted" });
});

export default router;
