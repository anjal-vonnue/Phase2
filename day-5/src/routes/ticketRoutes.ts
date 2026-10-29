import { Router } from "express";
import {
  addAssignee,
  createTicket,
  deleteTicket,
  getTicketById,
  listTickets,
  updateTicketStatus,
  validateTicket,
} from "../services/ticketServices.js";

const router = Router();

router.post("/tickets", async (req, res) => {
  const error = validateTicket(req.body);
  if (error) {
    res.status(400).json({ error: error });
  }

  const ticket = await createTicket(req.body);

  res.status(201).json({ ticket });
});

router.get("/tickets", async (req, res) => {
  const tickets = await listTickets();
  res.status(200).json(tickets);
});

router.get("/tickets/:id", async (req, res) => {
  const ticket = await getTicketById(Number(req.params.id));
  if (!ticket) {
    res.status(404).json({ error: "ticket not found" });
  }
  res.status(200).json(ticket);
});

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

router.delete("/tickets/:id", async (req, res) => {
  const success = deleteTicket(Number(req.params.id));
  if (!success) {
    res.status(404).json({ error: "ticket not found" });
  }

  res.status(200).json({ message: "ticket deleted" });
});

export default router;
